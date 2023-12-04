import React, { useEffect, useState } from 'react'
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import USER_ACTION from '../../redux/user/user_action';
import { register } from '../../services/user_service';
function Register(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        setUser({ ...user, [k]: v });
    }
    useEffect(() => {
        console.log(user);
    }, [user]);
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const rs = await register(user);
            if (rs.message === "Done") {
                alert("Register successfully!");
                navigate("/login");
            }
            else {
                alert("Something's wrong");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <section>
            <div className="register">
                <div className='home_register'><Link to={'/'}> <i className="bi bi-house"></i></Link></div>
                <div className="form_register">
                    <h2>Register</h2>
                    <form id='form' className='flex flex-col' method='post' onSubmit={registerUser} style={{ marginTop: "0px" }}>
                        <input type="text" placeholder=' ' id='fullname' name='fullname' value={user.fullname} onChange={handleInput} required />
                        <label for="fullname" style={{ textAlign: 'left' }} className='user_action'>Full name</label>
                        <input type="email" placeholder=' ' id='email' name='email' value={user.email} onChange={handleInput} required />
                        <label for="email" style={{ textAlign: 'left' }} className='user_action'>Email</label>
                        <input type="password" placeholder=' ' id='password' name='password' value={user.password} onChange={handleInput} required minLength={6} />
                        <label for="password" style={{ textAlign: 'left' }} className='user_action'> Password</label>
                        <input type="password" placeholder=' ' id='confirmPassword' name='confirmPassword' value={user.confirmPassword} onChange={handleInput} required minLength={6} />
                        <label for="confirmPassword" style={{ textAlign: 'left' }} className='user_action'>Verify password</label>

                        <div className='d-flex align-items-start justify-content-between flex-column options'>
                            <div className='d-flex align-items-center'><input type='checkbox'></input> Acecpt terms of policies and use</div>
                            <div className='pt-1'>Already had an account? <Link to={'/login'} className='login_link'>Login</Link></div></div>
                        <button className='btn mt-0' type='submit'>Register</button>
                    </form>
                </div>

            </div>
        </section>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: rs => { dispatch({ type: USER_ACTION.REGISTER, payload: rs }) }
    }

}
export default connect(null, mapDispatchToProps)(Register);
