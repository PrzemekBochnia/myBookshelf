import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import classes from "./AllBooks.module.css";
import Welcome from './Welcome';

const AllBooks = ({showAll}) => {
    const [url,setUrl] = useState(`https://gnikdroy.pythonanywhere.com/api/book`);
    const [data,setData] = useState([]);
    const [books,setBooks] = useState([]);
    const {currentUser} = useAuth();

    useEffect(()=>{
      const getData =()=>{
        axios.get(url).then((response)=>{
          setData(response.data);
          setBooks(response.data.results)
        });
      }
      getData()
    },[]);
     
    const handleNextBtn = () =>{
      setUrl(data.next);
    };
    const handlePreviousBtn = () =>{
      setUrl(data.previous)
    };
    
    useEffect(()=>{
      const getData =()=>{
        axios.get(url).then((response)=>{
          setData(response.data);
          setBooks(response.data.results)
        });
      }
      getData()
    },[url]);
    
    const toRead = (id) =>{
      let bookToRead = books.find(book => book.id === id)
      fetch(`https://mybookshelfapp-97cc5-default-rtdb.firebaseio.com/users/${currentUser.uid}/myList.json`,{
        method: 'POST',
        body: JSON.stringify(bookToRead)
      })
      window.location.reload()
    };

    const list = books.map((book, id)=>{
      const resource = book.resources.map((reso, index)=>reso.uri)
      const filteredUri = resource.filter(text => text.includes('txt'))
      return(
        <>
            <div className={classes.listItem}>
              <div>
                <li key={id}> <a className={classes.toRead} href={filteredUri}> {book.title}</a></li>
              </div> 
              <div>
                <button onClick={()=>toRead(book.id)}>Add to Your List</button>
              </div>
            </div>
          </>
      )
    });
    return (
      <>
      <div className={currentUser && showAll ? classes.visible : classes.hidden}>
        <div className={classes.listContainer}>
          <Welcome/>
          <h2>List of all books</h2>
        {list ? list : null }
        <div className={classes.btnContainer}>
          <button onClick={handlePreviousBtn}>Previous</button>
          <button onClick={handleNextBtn}>Next</button>
        </div>
        </div>
      </div>
      </>
    );
};
export default AllBooks
