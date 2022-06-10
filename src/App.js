import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import AllBooks from './components/AllBooks';
import Registration from './components/Registration';
import Login from "./components/Login";
import Search from './components/Search';
import Home from "./components/Home";

const App =()=> {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path ='/' element={<Home/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/registration' element={<Registration/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
