import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import BooksImg from '../assets/books.jpg';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();
    const[error, setError] =  useState('');

    async function handleLogout() {
        setError("")
        try{
        await logout()
        navigate.push("/")
        }catch{
            setError("nie udało sie wylogować")
        }
        window.location.reload();
    };

  return (
    <header className={classes.header}>
            <div className={classes.headerContainer}>
                <h1 className={classes.logo}>My<span>BookShelf</span></h1>
                <nav>
                    <ul className={classes.headerNav}>
                        {currentUser ? 
                        <>
                        <li className={classes.navElement}>{currentUser && currentUser.email}</li> 
                        <li className={classes.navElement} onClick={handleLogout}>Logout</li> 
                        </>
                        : 
                        <>
                        <li className={classes.navElement}><Link to = '/login'>Login</Link></li>
                        <li className={classes.navElement}><Link to = '/registration'>Registration</Link></li>
                        </>
                    }
                    </ul>
                </nav>
            </div>
            <label>
                <input type="checkbox"/>
                <span className={classes.menu}> <span className={classes.hamburger}></span> </span>
                <ul>
                    <li className={currentUser && currentUser.email ? classes.hidden : classes.visible}><Link to = '/login'>Login</Link></li>
                    <li className={currentUser && currentUser.email ? classes.hidden : classes.visible}><Link to = '/registration'>Registration</Link></li>
                    <li className={currentUser && currentUser.email ? classes.visible : classes.hidden} onClick={handleLogout}>Logout</li> 
                </ul>
            </label>
            <div className={classes['mainImage']}>
                <img src={BooksImg} alt='beer'/>
            </div>   
        </header>    
  )
}
