import './home.css';
import ProductGrid from "../layouts/product_grid";
import ProductList from "../layouts/product_list";
import PurchasingPolicies from "../layouts/puchasing_policies";
import Slider from "../layouts/slider";
import ScrollToTop from "react-scroll-to-top";
import { Tab, Row, Col, Tabs } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { limited_product, new_product, sales_product } from '../../services/product_service';
import { list_favourite } from '../../services/favourite_service';
import FAVOURITE_ACTION from '../../redux/favourite/favourite_action';
import { connect } from 'react-redux';
import { list_cart } from '../../services/cart_service';
import CART_ACTION from '../../redux/cart/cart_action';
function Home(props) {
    const user = props.state.currentUser;
    window.scrollTo(0, 0);
    const [limited, setLimited] = useState([]);
    const [sales, setSales] = useState([]);
    const [news, setNews] = useState([]);
    const loadLimited = async () => {
        try {
            const rs = await limited_product();
            setLimited(rs.products);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getData = async () => {
        try {
            const rs = await list_favourite(user.user_id);
            const cs = await list_cart(user.user_id);
            if (!rs.favourite && !rs._id) {
                const listF = rs.products.favourite.items;
                props.updateFavourite(listF);
            }
            if (!cs.cart && !cs._id) {
                const listC = cs.products.cart.items;
                props.updateCart(listC);
            }

        } catch (error) {
            console.log(error)
        }
    }
    const loadNews = async () => {
        try {
            const rs = await new_product();
            setNews(rs.products);
        }
        catch (error) {
            console.log(error);
        }
    }
    const loadSales = async () => {
        try {
            const rs = await sales_product();
            setSales(rs.products);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
        loadLimited();
        loadNews();
        loadSales();
    }, [])
    return (
        <>
            <Slider />
            <ProductGrid />
            <div className='container'>
                <Tabs
                    defaultActiveKey="home"
                    className="mb-3 home-tab tab"
                    fill
                    style={{ margin: "0 auto" }}
                >
                    <Tab eventKey="home" title="New">
                        <div className="pt-3">
                            <div className="products  product-list ">
                                <div className='row'>
                                    {news.slice(1, 5).map((item, index) => {
                                        return <ProductList productList={item} key={index} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Limited">
                        <div className="pt-3">
                            <div className="products container product-list ">
                                <div className='row d-flex flex-content-center '>
                                    {limited.slice(1, 5).map((item, index) => {
                                        return <ProductList productList={item} key={index} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="sales" title="Sales">
                        <div className="pt-3">
                            <div className="products container product-list ">
                                <div className='row'>
                                    {sales.slice(1, 5).map((item, index) => {
                                        return <ProductList productList={item} key={index} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <ScrollToTop smooth color="#000" />
            <PurchasingPolicies />

        </>
    );
}
const mapStateToProps = (state, ownProp) => {
    return {
        state: state.user_reducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateFavourite: (favourite) => {
            dispatch({ type: FAVOURITE_ACTION.UPDATE_FAVOURITE, payload: favourite })
        },
        updateCart: (cart) => {
            dispatch({ type: CART_ACTION.UPDATE_CART, payload: cart })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);