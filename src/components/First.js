import React from 'react';
import { useAuth } from '../context/AuthContext';
import classes  from "./First.module.css";

export default function First() {
    const {currentUser} = useAuth();

  return (
    <div className={currentUser ? classes.hidden : classes.visible}>
        <h1>
            Welcome to the My BookShelf app. Add the books you want to read to your list and read wherever you want.
        </h1>
    </div>
  )
};
