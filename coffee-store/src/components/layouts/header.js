import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { connect } from 'react-redux';
import USER_ACTION from '../../redux/user/user_action';
import FAVOURITE_ACTION from '../../redux/favourite/favourite_action';
import CART_ACTION from '../../redux/cart/cart_action';
import ORDER_ACTION from '../../redux/order/order_action';

function Header(props) {
    const state = props.state;
    const navigate = useNavigate();
    const history = useNavigate()
    const [search, setSearch] = useState('')
    const debounced = useDebouncedCallback(
        (search) => { setSearch(search); }, 250, { maxWait: 1000 }
    )
    const searchNavigate = (e) => {
        e.preventDefault();
        navigate(`/search/${search}`);
    }
    const resetSearch = () => {
        document.getElementById('search').value = "";
    }
    const LogOut = () => {
        props.deleteCart();
        props.deleteFavourite();
        props.deleteOrder();
        props.logOut();
        history('/');
    }
    return (
        <header className="container pt-3">
            <div className="d-flex row header justify-content-between">
                <div className="col-2 d-flex">
                    <img src="/images/logo.png" alt="Logoimage" width="30px" height="40px" style={{ marginTop: "7px" }} /><span className="logo">Notos</span></div>
                <div className="col-8">
                    <form className="d-flex justify-content-end align-items-center me-5" onSubmit={(e) => { searchNavigate(e); resetSearch(); }}>
                        <input type="text" name="search" id="search" placeholder="Find our product..." className="w-75" onChange={(e) => debounced(e.target.value)} /><i
                            className="bi bi-search" onClick={(e) => { searchNavigate(e); resetSearch(); }}></i>
                    </form>
                </div>
                <div className="d-flex col-2 justify-content-end group-icon_header">
                    <div className="d-flex flex-column align-items-center me-4 main_menu"> <i className="bi bi-person-circle"></i>
                        <div className='account'>
                            <div>{state[1]?.currentUser?.fullname ? <NavLink><span>{state[1]?.currentUser?.fullname}</span></NavLink> : <><NavLink to={"/login"}><span>Login</span></NavLink><span>/</span><NavLink to={"/sign-up"}><span>Register</span></NavLink></>}</div>
                            {state[1]?.currentUser?.fullname ? <div className='sub_menu'>
                                <NavLink to={"/account"}><span>Account</span></NavLink>
                                <NavLink to={"/favourite"}><span>Favourite</span></NavLink>
                                <NavLink to={"/orders"}><span>Orders</span></NavLink>
                                <NavLink onClick={LogOut}><span>Logout</span></NavLink>
                            </div> : <></>}

                        </div>
                    </div>
                    <div className=" d-flex flex-column  align-items-center"><NavLink to={"/cart"}><i className="bi bi-cart3"></i><span className='number'>{state[0]?.cart?.length}</span>
                        <div className='cart'><span>Cart</span></div></NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
const mapStateToProps = (state, ownProp) => {
    return {
        state: [state.cart_reducer, state.user_reducer]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch({ type: USER_ACTION.LOGOUT, payload: {} })
        },
        deleteFavourite: () => {
            dispatch({ type: FAVOURITE_ACTION.DELETE_FAVOURITE, payload: [] })
        },
        deleteCart: () => {
            dispatch({ type: CART_ACTION.DELETE_CART, payload: [] })
        },
        deleteOrder: () => {
            dispatch({ type: ORDER_ACTION.DELETE_ORDER, payload: [] })

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);