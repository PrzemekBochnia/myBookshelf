import React from 'react'
import { useAuth } from '../context/AuthContext';
import classes from './Welcome.module.css';


export default function Welcome() {
    const {currentUser} = useAuth();

  return (
    <div className={currentUser ? classes.visible : classes.hidden}>
        <h1>
            Hi {currentUser && currentUser.email} find the book you are interested in and add it to your list. Click on the title and enjoy reading.
        </h1>
    </div>
  )
}
