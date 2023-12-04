import './cart.css';
import ScrollToTop from 'react-scroll-to-top';
import { useNavigate } from 'react-router-dom';
import CART_ACTION from '../../redux/cart/cart_action';
import { connect } from 'react-redux';
import NoItems from './noItems';
import { useEffect, useState } from 'react';
import { add_cart, get_cart_id, modify_cart } from '../../services/cart_service';
import { addFOC } from '../../services/user_service';
function Cart(props) {
    const [isExist, setIsExist] = useState(false);
    const navigate = useNavigate();

    const cartItems = props.state[0].cart;
    const user = props.state[1].currentUser;
    const loadCart = async () => {
        try {
            const rs = await get_cart_id(user.user_id);
            if (rs.message === "No cart exists for this user") {
                try {
                    const en = await add_cart({ items: cartItems });
                    const us = await addFOC({ user_id: user.user_id, cart: en.cart_id });
                    return us;
                }
                catch (error) {
                    console.log(error);
                }
            }
            const ds = await modify_cart({ cart_id: rs, items: cartItems });
            return ds;

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadCart();
    }, [cartItems])
    const checkout = () => {
        if (cartItems.length === 0) {
            setIsExist(true);
            setTimeout(() => {
                setIsExist(false);
                navigate('/');
            }, 2000);
        }
        else {
            navigate('/checkout');
        }

    }
    const sumMoney = cartItems.reduce((initValue, item) => {
        initValue += item.price * item.quantity;
        return initValue;
    }, 0)
    const taxCost = 0.1 * sumMoney;
    const deleteItem = (index) => {
        const deletedCart = [...cartItems];
        deletedCart.splice(index, 1);
        props.deleteCart(deletedCart);
    }

    return (
        <div className="container mt-4 d-flex flex-column" >
            <div className="row  d-flex justify-content-between" id="shopping">
                <div className="col-7 product" style={{ paddingLeft: "0px" }}>
                    <h3 className="title">Cart</h3>
                    <table id="shopping-products-table" className="table text-center align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Thumbnail</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="productShop">
                            {
                                cartItems.map((item, index) => (
                                    <tr >
                                        <td>{index + 1}</td>
                                        <td><img src={item.thumbnail} width={"120px"} height={"180px"} alt="Product thumbnail" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.price}$</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.quantity * item.price}$</td>
                                        <td><i className="bi bi-x-lg delete_cart" onClick={() => { deleteItem(index) }}></i></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <NoItems status={isExist} />
                <div className="col-4 invoice">
                    <h3 style={{ paddingBottom: 32 }}>Cart total</h3>
                    <hr />
                    <div className="subTotal d-flex justify-content-between">
                        <h5>Subtotal</h5>
                    </div> <br />
                    {
                        cartItems.map((item, index) => (
                            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "5px" }}><span>{item.title}</span><span>{item.price * item.quantity}$</span></div>
                        ))
                    }
                    <div style={{ textAlign: "right", paddingTop: "10px" }}>{sumMoney}$
                    </div>
                    <hr />
                    <div className="shipping d-flex justify-content-between">
                        <h5>Tax</h5></div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "5px" }}><span>Value-added tax(VAT)</span><span>{sumMoney ? taxCost : 0}$</span></div>
                    <div style={{ textAlign: "right", paddingTop: "10px" }}>{sumMoney ? taxCost : 0}$</div>
                    <hr />
                    <div className="total d-flex justify-content-between align-items-center">
                        <h3>Total</h3><span id="total" className="flex">{sumMoney ? sumMoney + taxCost : 0}$</span></div>
                    <button type="button" className="btn btn-danger mt-4 mb-5" onClick={checkout}>Proceed to checkout</button>
                </div>
            </div>

            <ScrollToTop smooth color="#000" />

        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: [state.cart_reducer, state.user_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCart: (cart) => {
            dispatch({ type: CART_ACTION.UPDATE_CART, payload: cart })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);