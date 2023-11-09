import axios from 'axios';
import React, { useState } from 'react';
import './Login.css'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/login', {
                email,
                password
            })
            console.log('Login Successful', res.data)
        } catch (error) {
            console.error('Error logging in', error);
        }
    }
    return (
        
        <form className='login-form'>
            <h3> Log In </h3>
            <div>
                
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />

            </div>

            <div>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
            </div>

            <button onClick={handleLogin}> Log In</button>

        </form>
    );

};

export default Login;