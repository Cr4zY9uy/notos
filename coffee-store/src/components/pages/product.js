import { Row, Col, Image, Button, Tab, Tabs } from "react-bootstrap";
import FavouriteExisted from "./favourite_existed";
import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import './product.css';
import { Rate } from "antd";
import { Link, useParams } from "react-router-dom";
import { detail_product } from "../../services/product_service";
import { detail_category } from "../../services/category_service";
import { connect } from "react-redux";
import CART_ACTION from "../../redux/cart/cart_action";
import FAVOURITE_ACTION from "../../redux/favourite/favourite_action";
import Loading from "./loading";

function Product(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    window.scrollTo(0, 100);
    const { id } = useParams();
    const [related, setRelated] = useState([]);
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const loadProduct = async () => {
        try {
            const rs = await detail_product(id);
            setProduct(rs);
            setStar(rs.rating);
        }
        catch (error) {
            console.log(error.message);
        }
    }
    const loadRelated = async () => {
        try {
            if (!product || !product.category_name) {
                return;
            }
            const rs = await detail_category(product.category_name);
            const filterRe = rs.filter(item => item.product_id !== id);
            setRelated(filterRe);
        }
        catch (error) {
            console.log(error);
        }
    }
    const addToCart = () => {
        const cart = props.state[0].cart;

        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.product_id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        props.addToCart(cart);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };
    const checkFavourite = () => {
        const favourite = props.state[1].favourite;

        const existingItemIndex = favourite.findIndex(favouriteItem => favouriteItem.product_id === product.product_id);

        if (existingItemIndex !== -1) {
            return true
        } else {
            return false;
        }
    }


    const addToFavourite = () => {
        const favourite = props.state[1].favourite;  // Create a shallow copy of the cart

        const existingItemIndex = favourite.findIndex(favouriteItem => favouriteItem.product_id === product.product_id);

        if (existingItemIndex !== -1) {
            setIsModalOpen(true)
            setTimeout(() => {
                setIsModalOpen(false);
            }, 1000)
        } else {
            favourite.push(product);
        }
        props.addToFavourite(favourite);

    };
    useEffect(() => {
        loadProduct();
        checkFavourite();
    }, [id, props])
    useEffect(() => {
        if (product.category_name) {
            loadRelated();
        }
    }, [product.category_name])
    return (
        <div className="container pt-5">
            <Row>
                <Col xs={1} style={{ paddingLeft: "0px", marginRight: "20px" }}>
                    <div className="image_group d-flex flex-column justify-content-between">
                        <img src={product.thumbnail} alt="pic" width={90} height={90} />
                        <img src={product.thumbnail} alt="pic" width={90} height={90} />
                        <img src={product.thumbnail} alt="pic" width={90} height={90} />
                    </div>
                </Col>
                <Col className="d-flex justify-content-center">
                    <div className='sold_out' style={{ display: product.qty === 0 ? "block" : "none", left: "210px" }}></div>
                    <Image src={product.thumbnail} height={450} width={450} alt="product_image"></Image>
                </Col>
                <Col className="detail_product1">
                    <h1>{product.title}</h1>
                    <div><span className="detail_product-title">Price: </span>
                        <span className="price">{product.price}$</span></div>
                    <div><span className="detail_product-title text-start">Rate: </span>
                        <Rate disabled value={star} style={{ color: "#d8d81a", fontSize: "1.3rem", display: "inline" }} />

                    </div>

                    <div>
                        <p className="text-start">
                            {product.description}
                        </p>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button variant="success add_to_cart" onClick={addToCart} disabled={product.qty === 0}><i className="bi bi-cart"></i><span style={{ paddingLeft: "10px" }}>Add to cart</span></Button><span><i className="bi bi-heart-fill add-to-favourite" style={{ color: checkFavourite() ? "red" : "#495057" }} onClick={addToFavourite}></i></span>
                    </div>
                    <div id="loading" style={{ display: "none" }}>
                    </div>
                    <Loading status={loading} />
                    <FavouriteExisted
                        status={isModalOpen}
                    />
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="home"
                className="mb-3 tab"
                fill
            >
                <Tab eventKey="home" title="Description">
                    <p className="pt-3">
                        {product.description}
                    </p>
                </Tab>
                <Tab eventKey="profile" title="Reviews">
                    <Row className="pt-3">
                        <Col xs={1}>
                            <img src='/images/avatar2.jfif' alt='review_pic' className="reviewer_pic" />
                        </Col>
                        <Col xs={11}>
                            <h2 className="reviewer_name">Marik Howl</h2>
                            <p className="reviewer_feedback">It has nice smell, good taste and extremely high caffein.</p>
                            <p className='reviewer_rating'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </p>
                        </Col>
                    </Row>
                    <Row className="pt-3">
                        <Col xs={1}>
                            <img src='/images/avatar3.jpg' alt='review_pic' className="reviewer_pic" />
                        </Col>
                        <Col xs={11}>
                            <h2 className="reviewer_name">Kenrik Harmal</h2>
                            <p className="reviewer_feedback">Not too bad with a product made in Africa.</p>
                            <p className='reviewer_rating'>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </p>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <Row className="related_products ">
                <h1>Related products</h1>
                {
                    related.slice(0, 3).map((item, index) => {
                        return <>
                            <Col xs={4} className="producti" key={index}>
                                <Link to={`/product/${item.product_id}`} >
                                    <img src={item.thumbnail} alt="pic" />
                                    <span>{item.title}</span>
                                    <span>{item.price}$</span>
                                </Link>
                            </Col>
                        </>
                    })
                }

            </Row>
            <ScrollToTop smooth color="#000" />
        </div >

    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: [state.cart_reducer, state.favourite_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (cart) => {
            dispatch({ type: CART_ACTION.UPDATE_CART, payload: cart });
        },
        addToFavourite: (favourite) => {
            dispatch({ type: FAVOURITE_ACTION.UPDATE_FAVOURITE, payload: favourite })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);