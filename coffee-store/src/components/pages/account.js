import './account.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-to-top';
import USER_ACTION from '../../redux/user/user_action';
import FAVOURITE_ACTION from '../../redux/favourite/favourite_action';
import CART_ACTION from '../../redux/cart/cart_action';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Update } from '../../services/user_service';
function Account(props) {
    const user = props.state.currentUser;
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const handleInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        setData({ ...data, [k]: v });
    }
    const LogOut = () => {
        props.deleteCart();
        props.deleteFavourite();
        props.logOut();
    }
    const dataSend = {
        user_id: user.user_id,
        data
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rs = await Update(dataSend);
            console.log(dataSend);
            if (rs.message === "Done") {
                alert("Update successfully");
                LogOut();
                navigate("/login");
            }
            else {
                alert("Something's wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (!user.user_id) { navigate('/'); }
    }, [user])
    return (
        <section className='account_page container'>
            <h1 className='pt-5'>Personal information</h1>
            <div className='d-flex pt-5'>
                <img src='./images/avatar1.webp' alt='avatar' className='' />
                <Form className='update_account' onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" className='text-start'>
                            Full name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control defaultValue={user.fullname} name='full_name' required onChange={handleInput} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" className='text-start'>
                            Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control defaultValue={user.address} name='address' required onChange={handleInput} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" className='text-start'>
                            Birthday
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control defaultValue={user.birthday} name='birthday' required onChange={handleInput} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2" className='text-start'>
                            Phone
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control defaultValue={user.phone} name='phone' required onChange={handleInput} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" className='update_button'>
                        Update
                    </Button>
                </Form>
            </div>
            <ScrollToTop smooth color="#000" />

        </section>
    );
}
const mapStateToProps = (state, ownState) => {
    return {
        state: state.user_reducer
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);