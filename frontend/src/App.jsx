import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'





import { Login } from '../src/login/Login'
import { Signup } from '../src/Signup/Signup'
import { Home } from '../src/home/Home'

import { Work} from '../src/work/Work'
import { Edit} from '../src/edit/Edit'






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
