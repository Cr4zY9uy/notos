import React, { useState } from 'react'
import './login.css';
import { Link } from 'react-router-dom';
import { updateJWT } from '../../api';
import { useNavigate } from 'react-router-dom';
import USER_ACTION from '../../redux/user/user_action';
import { connect } from 'react-redux';
import { login } from '../../services/user_service';
import api from '../../api';
function Login(props) {
    const history = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const handleInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        setUser({ ...user, [k]: v });
        console.log(user);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rs = await login(user);
            if (rs.message) {
                alert(rs.message);
            }
            else {
                props.login(rs);
                history("/");
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <section className='login'>
            <div className='home_login'><Link to={'/'}> <i className="bi bi-house"></i></Link></div>
            <div className="form_login">
                <h2>Login</h2>
                <form id='form' method='post' className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
                    <input type="email" placeholder=' ' id='email' value={user.email} name='email' onChange={handleInput} required />
                    <label for="email" style={{ textAlign: 'left' }} className='user_action'>Email</label>
                    <input type="password" placeholder=' ' id='password' value={user.password} name='password' onChange={handleInput} required minLength={6} />
                    <label for="password" style={{ textAlign: 'left' }} className='user_action'>Password</label>
                    <div className='d-flex align-items-center justify-content-between options'>
                        <div className='d-flex align-items-center'><input type='checkbox'></input> Remeber password</div>
                        <div><Link to={'/forgotpass'} className='forgotpass_link'>Forgot password?</Link></div></div>
                    <button className='btn' type='submit'>Login</button>
                </form>

                <h5>Don't have an account? <Link to={'/sign-up'} className='register_link'>Register</Link></h5>
            </div>
        </section>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: rs => { dispatch({ type: USER_ACTION.LOGIN, payload: rs }) }
    }

}
export default connect(null, mapDispatchToProps)(Login);