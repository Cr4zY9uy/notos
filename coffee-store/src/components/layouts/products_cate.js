import './products_cate.css';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import FAVOURITE_ACTION from '../../redux/favourite/favourite_action';
import CART_ACTION from '../../redux/cart/cart_action';
import { connect } from 'react-redux';
import FavouriteExisted from '../pages/favourite_existed';
import { useState } from 'react';
import Loading from '../pages/loading';
function ProductsCate(props) {
    const data = props.product;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const addToCart = () => {
        const cart = props.state[0].cart;

        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === data.product_id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...data, quantity: 1 });
        }

        props.addToCart(cart);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };
    const checkFavourite = () => {
        const favourite = props.state[1].favourite;

        const existingItemIndex = favourite.findIndex(favouriteItem => favouriteItem.product_id === data.product_id);

        if (existingItemIndex !== -1) {
            return true
        } else {
            return false;
        }
    }


    const addToFavourite = () => {
        const favourite = props.state[1].favourite;

        const existingItemIndex = favourite.findIndex(favouriteItem => favouriteItem.product_id === data.product_id);

        if (existingItemIndex !== -1) {
            setIsModalOpen(true)
            setTimeout(() => {
                setIsModalOpen(false);
            }, 1000)
        } else {
            favourite.push(data);
        }
        props.addToFavourite(favourite);

    };
    return (
        <>
            <figure className="product-media text-center col-4">
                <div className='sold_out' style={{ display: data.qty === 0 ? "block" : "none" }}></div>
                <div className='favourite'><i className="bi bi-heart" style={{ color: checkFavourite() ? "red" : "#1c1c1cc5" }} onClick={addToFavourite}></i></div>
                <Link to={`/product/${data.product_id}`}>
                    <img src={data.thumbnail} height="270px" alt='product_image' />
                </Link>
                <div>
                    <p className='product_name'>{data.title}</p>
                    <p className='product_price'>{data.price}$</p>
                    <Rate disabled defaultValue={data.rating} style={{ color: "#d8d81a", fontSize: "0.8rem", display: "flex" }} />

                </div>
                <div className="product-action">
                    <button className="btn-product btn-cart" onClick={addToCart} disabled={data.qty === 0}><span>Add to cart</span></button>
                </div>
            </figure>
            <Loading status={loading} />
            <FavouriteExisted
                status={isModalOpen}
            />
        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductsCate);