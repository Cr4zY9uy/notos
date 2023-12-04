import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './forgotpass.css';
import { ForgotPassword } from '../../services/user_service';
export default function ForgotPass() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleInput = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ForgotPassword({ email: email });
            console.log(response);
            if (response.message === "No user match") {
                alert("Email no exists");
            }
            else {
                navigate(response.link);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='forgot_password'>
            <div className='home_forgot'>
                <Link to={'/'}>
                    <i className="bi bi-house"></i>
                </Link>
            </div>
            <div className="form_forgot_password">
                <h2 className='pb-2'>Forgot password</h2>
                <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder=' '
                        id='email'
                        name='email'
                        onChange={handleInput}
                        aria-label="Email"
                        required
                    />
                    <label htmlFor="email" style={{ textAlign: 'left' }} className='user_action'>Email</label>
                    <button type="submit" className='btn send mt-0'>Send</button>
                </form>
                <div className='options_link'>
                    <h5>Already had an account? <Link to={'/login'} className='login_link'>Login</Link></h5>
                    <h5>Don't have an account? <Link to={'/sign-up'} className='register_link'>Register</Link></h5>
                </div>
            </div>
        </section>
    );
}
