import axios from 'axios';
import React, {  useState } from 'react';
import classes from "./Search.module.css";
import { useAuth } from '../context/AuthContext';


export default function Search({showSearch}) {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState("");
    const {currentUser} = useAuth();
    const searchUrl = `https://gnikdroy.pythonanywhere.com/api/book/?search=${searchValue}`;
    const searchHandle = () =>{
        axios.get(searchUrl).then((response)=>{
          setSearch(response.data.results)
        })
      };
      const toRead = (id) =>{
        let bookToRead = search.find(book => book.id === id)
        fetch(`https://mybookshelfapp-97cc5-default-rtdb.firebaseio.com/users/${currentUser.uid}/myList.json`,{
          method: 'POST',
          body: JSON.stringify(bookToRead)
        })
        window.location.reload()
      };
      
      const searchList = search ? search.map((book,id)=>{
        const resource = book.resources.map((reso, index)=>reso.uri)
        const filteredUri = resource.filter(text => text.includes('txt'))
        return(
          <>
          <div className={classes.listItem}>
            <div>
              <li key={id}><a href={filteredUri}>{book.title}</a></li>
            </div>
            <div>
              <button onClick={()=>toRead(book.id)}>Add to Your List</button>
            </div>
          </div>  
          </>
        )
      }):null;
  return (
      <>
    <div className={currentUser && showSearch ? classes.visible : classes.hidden}>    
      <h2>Find your favorite books</h2>
      <input
        type="text"
        name="search"
        placeholder='search'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        />
        <button onClick={searchHandle}>Search</button>
      <div>
        {searchList}
      </div>
      </div>
        </>
        )
};
