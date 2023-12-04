import React, { useEffect, useState } from 'react'
import './resetpass.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ResetPassword } from '../../services/user_service';
export default function ResetPass() {
    const { rid } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const handleInput = (e) => {
        const v = e.target.value;
        const k = e.target.name;
        setData({ ...data, [k]: v });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rs = await ResetPassword(rid, data);
            if (rs.message === "Done") {
                alert("Reset password successfully");
                navigate("/login");
            }
            else {
                alert("Something's wrong");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='reset_password'>

            <div className="form_reset_password">
                <h2>Change password</h2>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
                    <input type="password" placeholder=' ' id='password' name='password' onChange={handleInput} required minLength={6} />
                    <label for="password" style={{ textAlign: 'left' }} className='user_action'>Password</label>
                    <input type="password" placeholder=' ' id='repassword' name='confirmPassword' onChange={handleInput} required minLength={6} />
                    <label for="repassword" style={{ textAlign: 'left' }} className='user_action'>Verify password</label>
                    <button className='btn mt-0 changepass'>Change password</button>
                </form>
            </div>
        </section>
    )
}