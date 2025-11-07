import { useState } from 'react';
import '../style/addtask.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function SignUp() {
    const navigate = useNavigate();
    const[userData,setUserData] = useState({});

    useEffect(()=>{
        if (localStorage.getItem('login')) {
            navigate('/');
        }
    })

    
     const handleLogin = async()=>{
        console.log(userData);
        
        let result = await fetch("http://localhost:3000/login",{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{
                "Content-Type":"Application/json",
            },
        })
        result = await result.json();
        if (result.success) { 
            document.cookie="token="+result.token;
            localStorage.setItem('login',userData.email);
            window.dispatchEvent(new Event('localStorage-change'));
            navigate('/');
        }else{
            alert("Try after some time");
        }
    }
    
    return (
        <div className="container">
            <h1>Login</h1>
                <label htmlFor="">Email</label>
                <input  onChange={(event)=>setUserData({...userData,email:event.target.value})} type="email" name='email' placeholder='Enter your email'/>
                <label htmlFor="">Password</label>
                <input  onChange={(event)=>setUserData({...userData,password:event.target.value})} type="password" placeholder='Enter your password' />
                <button onClick={handleLogin} className="submit">Login</button>
                <Link className='link' to='/signUp'>Sign Up</Link>
        </div>
    )
}