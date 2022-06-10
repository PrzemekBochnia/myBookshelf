import React, { useState } from 'react';
import AllBooks from './AllBooks';
import Search from './Search';
import Header from './Header';
import First from './First';
import MyBooksList from './MyBooksList';
import classes from './Home.module.css';

export default function Home() {

  const [showAllBooks, setShowAllBooks] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showList, setShowList] = useState(false);

  const showAll = () =>{
    setShowAllBooks(true)
    setShowSearchBar(false)
    setShowList(false)
  };
  const showSearch = () =>{
    setShowAllBooks(false)
    setShowSearchBar(true)
    setShowList(false)
  };
  const showMyList = () =>{
    setShowAllBooks(false)
    setShowSearchBar(false)
    setShowList(true)
  };  

  return (
      <>
      <Header/>
      <div className={classes.navi}>
      <div onClick={()=>showAll()}>All Books</div>
      <div onClick={()=>showSearch()}>Search</div>
      <div onClick={()=>showMyList()}>MyBooks</div>
      </div>
      <First/>
      <AllBooks showAll={showAllBooks}/>
      <Search showSearch={showSearchBar}/>
      <MyBooksList showMyList={showList}/>
      </>
  )
}
