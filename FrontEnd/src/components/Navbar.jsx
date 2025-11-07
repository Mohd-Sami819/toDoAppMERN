import {Link, Navigate, useNavigate} from "react-router-dom"
import '../style/navbar.css'
import { useEffect } from "react";
import { useState } from "react";

function Navbar(){
    const[login ,setLogin] = useState(localStorage.getItem('login'));
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.removeItem('login');
        setLogin(null);
        setTimeout(() => {
            navigate('/login');
        }, 0);
    }
    useEffect(()=>{
        const handleStorage = () =>{
            setLogin(localStorage.getItem('login'));
        }
        window.addEventListener('localStorage-change',handleStorage);
        return () =>{
            window.removeEventListener("localStorage-change",handleStorage);
        }
    },[])
    return(
    <nav className="navbar">
        <div className="logo">To Do App</div>
        <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add</Link></li>
            <li><Link onClick={logout}>Logout</Link></li>
        </ul>
    </nav>
    )
}

export default Navbar;