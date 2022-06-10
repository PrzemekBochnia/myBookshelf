import classes from "./Login.module.css";
import React from 'react'
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const {currentUser} = useAuth();
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()          
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate.push("/")
        }catch{
            setError("nie udało się zalogowac")
        }
        setLoading(false)
    };

  return (
    <div className={classes.loginContainer}>
    <h1>Log in</h1>
     {currentUser ? <h2>Welcome {currentUser && currentUser.email}</h2>  : null}
    <form className={classes.loginForm} onSubmit={handleSubmit}>
        <div>
            <label htmlFor="email" >Email</label>
            <input type="text" name="Email" ref={emailRef}/>
        </div>
        <div>
            <label htmlFor="password" >password</label>
            <input type="password"  ref={passwordRef}/>
        </div>
        <div className={classes.logRegButtonsContainer}>
            <button className={classes.logRegBtn} type="submit">Login</button>
            <button className={classes.logRegBtn} type="submit"><Link to='/'> Back to App</Link></button>
        </div>
    </form>
</div>
  )
}
