import { useState } from 'react';
import '../style/addtask.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function SignUp() {
    const[userData,setUserData] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('signUp')) {
            navigate('/');
        }
    })

    const handleSignUp = async()=>{
        let result = await fetch("http://localhost:3000/signUp",{
            method:"POST",
            body:JSON.stringify(userData),
            headers:{
                "Content-Type":"Application/json",
            },
        })
        result = await result.json();
        if (result.success) {
            console.log(result);
            document.cookie="token="+result.token;
            localStorage.setItem('signUp',userData.email);
            navigate('/');
        }
        else{
            alert("Try after some time");
        }
    }
    
    return (
        <div className="container">
            <h1>Sign Up</h1> 
                <label htmlFor="">Name</label>
                <input  onChange={(event)=>setUserData({...userData,name:event.target.value})} type="text" name="title" placeholder="Enter Your Name" />
                <label htmlFor="">Email</label>
                <input  onChange={(event)=>setUserData({...userData,email:event.target.value})} type="email" name='email' placeholder='Enter your email'/>
                <label htmlFor="">Password</label>
                <input  onChange={(event)=>setUserData({...userData,password:event.target.value})} type="password" placeholder='Enter your password' />
                <button onClick={handleSignUp} className="submit">Sign Up</button>
                <Link className='link' to='/login'>Login</Link>
        </div>
    )
}