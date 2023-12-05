import './checkout.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Thanks from './thanks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import CART_ACTION from '../../redux/cart/cart_action';
import ORDER_ACTION from '../../redux/order/order_action';
import ORDER_DETAIL_ACTION from '../../redux/orderdetails/orderdetail_action';
import { add_order } from '../../services/order_service';
import { addFOC } from '../../services/user_service';
import USER_ACTION from '../../redux/user/user_action';
import NoItems from './noItems';
import { get_cart_id, modify_cart } from '../../services/cart_service';
function Checkout(props) {
    const history = useNavigate()
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("Credit card");
    const [shipping, setShipping] = useState("Free");
    const [data, setData] = useState({});
    const shippingCost = {
        Free: 0,
        Standard: 10,
        Express: 100
    };
    const order = props.state[2].order;
    const cartList = props.state[0].cart;
    const user_id = props.state[1].currentUser.user_id;
    const token = props.state[1].jwt;
    const items = cartList.map((product) => ({
        title: product.title,
        thumbnail: product.thumbnail,
        quantity: product.quantity,
        price: product.price,
        product_id: product.product_id
    }))
    const sumMoney = cartList.reduce((initValue, item) => {
        initValue += item.price * item.quantity;
        return initValue;
    }, 0)
    const total = sumMoney + sumMoney * 0.1 + shippingCost[shipping];
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        setLastName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }
    const order_detail = {
        first_name: first_name,
        last_name: last_name,
        address: address,
        phone: phone,
        email: email,
        payment: payment,
        shipping: shipping,
        items: items,
        total: total
    }
    const changeActivePayment = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.payment').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedPayment = clickedOption.getAttribute('data-value');
        console.log(selectedPayment);
        setPayment(selectedPayment);
    }
    const changeActiveShipping = (e) => {
        const clickedOption = e.currentTarget;
        document.querySelectorAll('.shipping').forEach(option => {
            option.classList.remove('active');
        });
        clickedOption.classList.add('active');
        const selectedShipping = clickedOption.getAttribute('data-value');
        console.log(selectedShipping);
        setShipping(selectedShipping);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [isExist, setIsExist] = useState(false);
    const placeOrder = async () => {
        if (!token) {
            props.logOut();
            history('/');
        }
        if (items.length === 0) {
            setIsExist(true);
            setTimeout(() => {
                setIsExist(false);
                navigate('/');
            }, 2000);
        }
        try {
            const rs = await add_order(order_detail);
            if (rs.errors) {
                alert(rs.errors);
            }
            else {
                const infoU = {
                    user_id: user_id,
                    order: rs.order_id
                }
                setData(infoU)
            }
        } catch (error) {
            alert(error.message);
        }
    }
  useEffect(() => {
    if (data.order != null) {
      delete_cart_A_add_order();
    }
  }, [data]);
    const delete_cart_A_add_order = async () => {
        console.log(data);
        if (data.order != null) {
            const rs = await addFOC(data);

            if (rs.message === "Done") {
                setIsModalOpen(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 1000);
                props.deleteCart();
                const cartId = await get_cart_id(data.user_id);
                const set = await modify_cart({ cart_id: cartId.cart_id, items: [] })
                setTimeout(() => {
                    navigate('/');
                }, 1100);

            }
            else {
                console.log(rs.message);
            }
        }


    }

    return (
        <section className='container'>
            <h1 className="checkout_title pb-3">Checkout</h1>
            <div className='d-flex justify-content-between'>
                <Form className='bill'>
                    <h4 className='sumary_title'>Billing Infomation</h4>
                    <Form.Group className="mb-3">
                        <Row>
                            <Col>
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" name='first_name' onChange={(e) => handleFirstName(e)} required minLength={6} />
                            </Col>
                            <Col>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" name='last_name' onChange={(e) => handleLastName(e)} required minLength={6} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name='address' onChange={(e) => handleAddress(e)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name='phone' onChange={(e) => handlePhone(e)} required pattern='[0-9]{10}' />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' onChange={(e) => handleEmail(e)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Payment method</Form.Label>
                        <Row>
                            <Col name='payment' className='payment active' data-value='Credit card' onClick={(e) => changeActivePayment(e)}>
                                <div className='credit'><div><i className="bi bi-credit-card-2-back-fill"></i><span>Credit </span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                            <Col name='payment' className='payment' data-value='Paypal' onClick={(e) => changeActivePayment(e)}>
                                <div className='paypal'><div><i className="bi bi-paypal"></i><span>Paypal</span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                            <Col name='payment' className='payment' data-value='COD' onClick={(e) => changeActivePayment(e)}>
                                <div className='cod'><div><i className="bi bi-wallet-fill"></i><span>COD</span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group style={{ paddingTop: "20px" }}>
                        <Form.Label>Shipping method</Form.Label>
                        <Row>
                            <Col name='shipping' className='shipping active' data-value='Free' onClick={(e) => changeActiveShipping(e)}>
                                <div className='free '><div><i className="bi bi-envelope-fill"></i><span>Free</span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                            <Col name='shipping' className='shipping' data-value='Standard' onClick={(e) => changeActiveShipping(e)}>
                                <div className='standard  '><div><i className="bi bi-archive-fill"></i><span>Standard</span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                            <Col name='shipping' className='shipping' data-value='Express' onClick={(e) => changeActiveShipping(e)}>
                                <div className='express '><div><i className="bi bi-send-fill"></i><span>Express</span></div><i className="bi bi-check2-circle"></i></div>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <Thanks status={isModalOpen} />
                <NoItems status={isExist} />
                <div className="bill_detail">
                    <div className='order_info'>
                        <h4 className='sumary_title'>Order Information</h4>
                        <div className='sumary_product'>
                            {
                                cartList.map((item, index) => (
                                    <div className='product_summary'><div className='pic'><img src={item.thumbnail} height="60px" width="60px" alt='product_image' /><span>x{item.quantity}</span></div><span>{item.quantity * item.price}$</span></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='order_sumary'>
                        <h4 className='sumary_title'>Order Summary</h4>
                        <div className="subTotal_bill d-flex justify-content-between">
                            <h5>Subtotal</h5>
                        </div>
                        <div className='sumary_product'>
                            {
                                cartList.map((item, index) => (
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "5px" }}><span>{item.title}</span><span>{item.price * item.quantity}$</span></div>
                                ))
                            }
                            <div style={{ textAlign: "right", paddingTop: "5px" }}><span>{sumMoney}$</span></div>
                        </div>
                        <div className="shipping_bill d-flex justify-content-between pt-2 pb-2">
                            <h5>Shipping</h5>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: "5px" }}><span>{shipping}</span><span>{shippingCost[shipping] ? shippingCost[shipping] : 0}$</span></div>
                        <div style={{ textAlign: "right", paddingTop: "5px" }}><span>{shippingCost[shipping] ? shippingCost[shipping] : 0}$</span></div>
                        <div className="tax_bill d-flex justify-content-between pt-2 pb-2">
                            <h5>Tax</h5><span id="shipping">{sumMoney * 0.1}$</span></div>
                        <div className="total_bill d-flex justify-content-between align-items-center">
                            <h3>Total</h3><span id="total" className="flex">{total}$</span>
                        </div>
                        <Button variant='outline-success' onClick={() => {
                            placeOrder();
                            delete_cart_A_add_order();
                        }}>
                            Place order
                        </Button>
                    </div>
                </div>

            </div >
        </section >

    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: [state.cart_reducer, state.user_reducer, state.order_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCart: () => {
            dispatch({ type: CART_ACTION.UPDATE_CART, payload: [] })
        },
        addOrder: (order) => {
            dispatch({ type: ORDER_ACTION.UPDATE_ORDER, payload: order })
        },
        logOut: () => {
            dispatch({ type: USER_ACTION.LOGOUT, payload: {} })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
