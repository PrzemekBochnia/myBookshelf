import React, {useState, useRef} from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate  } from "react-router-dom";
import classes from './Registration.module.css'

export default function Registration() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {currentUser} = useAuth();

    async function handleSubmit(e){
        e.preventDefault()   
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("hasła nie sa takie same")
        }
        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate.push("/")
        }catch{
            setError("nie udało się założyć konta")
        }
        setLoading(false)
    };

  return (
    <div className={classes.regContainer}>
    <h1>Create account</h1>
    {currentUser && currentUser.email}
    <form className={classes.regForm} onSubmit={handleSubmit} >
        <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="Email" ref={emailRef}/>
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password"ref={passwordRef}/>
        </div>
        <div>
            <label htmlFor="password">repeat password</label>
            <input type="password" ref={passwordConfirmRef}/>
        </div>
        <div className={classes.logRegButtonsContainer}>
            <button className={classes.logRegBtn} type="submit">Sign up</button>
            <button className={classes.logRegBtn} type="submit"><Link to='/'> Back to App</Link></button>
        </div>
    </form>
</div>
  )
}
