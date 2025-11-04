import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { Home } from '../public/pages/Home';
import { Work } from '../component/work/Work';
import { Edit } from '../public/pages/edit/Edit.jsx';
import { Login } from '../public/pages/login/Login.jsx';
import { Signup } from '../public/pages/Signup/Signup.jsx';






function App() {


  return (
   <BrowserRouter>
      
   
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/page" element={<Work/>}/>
    {/* <Route path='editpage' element={<Editpage/>}/> */}
    <Route path='/edit/:projectid' element={<Edit/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    

    </Routes>
    </BrowserRouter>
  )
}

export default App
