import React, { useEffect } from 'react';
import {useState} from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavMenu from './components/navmenu.js'

import App from './App';
import HomePage from './pages/home';
import UserPage from './pages/users';
import Err404 from './pages/err404';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
function BaseSite(){
  const [users,updateUsers] = useState([])
  useEffect(()=> {
    axios.get('https://jsonplaceholder.typicode.com/users/').then(d => {
      updateUsers(d.data)
    })
  },[])
  
  return <>
    <div className="gridMain">
      <NavMenu/>
      <div id="main">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/users" element={<UserPage users={users} updateUser={updateUsers}/>} />
            <Route path="*" element={<Err404/>}/>
          </Routes>
      </div>
    </div>  
  </>
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseSite/>
    </BrowserRouter>
  </React.StrictMode>
);
