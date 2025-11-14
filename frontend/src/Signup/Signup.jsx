import { useState } from 'react'
import './Signup.css'
import { Button } from '../button/Button'
import axios from 'axios'
export function Signup(){

 const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/usersignup", {
        email,
        password
      })
      console.log(res)
      alert(res.data.message)
    } catch (err) {
      console.log(err)
      alert("Signup failed")
    }
  }

  return (
    <div className="Signupmain">
      <h1>Signup</h1><br/>
      <input className="signupmaininput" type="text" placeholder="Enter email" 
        onChange={(e)=>setemail(e.target.value)} />
      <br/>
      <input className="signupmaininput" type="password" placeholder="Enter password"
        onChange={(e)=>setpassword(e.target.value)} />
      <Button text="Signup" onClick={handleSignup}/>
    </div>
  )
}