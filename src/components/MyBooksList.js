import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import classes from './MyBooksList.module.css';


export default function MyBooksList({showMyList}) {
    const [booksList, setBooksList] = useState([])
    const {currentUser} = useAuth();
    const dataUrl = currentUser ? `https://mybookshelfapp-97cc5-default-rtdb.firebaseio.com/users/${currentUser.uid}/myList.json` : null

    useEffect(()=>{
        const getData =()=>{
          axios.get(dataUrl).then((response)=>{
            console.log(response.data);
            const readed = []
            for(const key in response.data){
              readed.push({
                id: key,
                title: response.data[key].title,
                resources: response.data[key].resources
              })
            }
            console.log(readed);
            setBooksList(readed)
          });
        }
        getData()
      },[dataUrl]);
      console.log(booksList);

      const readedBooksList = booksList.map((book,id)=>{
        const resource = book.resources.map((reso, index)=>reso.uri)
        const filteredUri = resource.filter(text => text.includes('txt'))
        return(
          <>
            <div key={id} className={classes.listItem}>
              <li key={id}><a href={filteredUri}> {book.title}</a></li>
              </div>
          </>
        )
      })


  return (
        <>
        <div className={currentUser && showMyList ? classes.active : classes.hidden}>
            <div>{ readedBooksList  ? readedBooksList : null}</div>
        </div>
        </>           
      
    )
}
