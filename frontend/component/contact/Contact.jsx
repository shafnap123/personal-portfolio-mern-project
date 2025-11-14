import { useEffect, useState } from "react";
import { Button } from "../../public/pages/button/Button";
import './Contact.css';
import axios from "axios";
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {  FiLogOut } from 'react-icons/fi';
import image from '../../public/img.jpeg'

import pdf from "../../src/assets/SHAFNA.P_CV.pdf"



export function Contact() {
    const [login, setlogin] = useState(null)
    const [refresh,setrefresh]=useState(false)
    console.log(login)
    function logout() {
        localStorage.clear()
        setrefresh(!refresh)

    }

    // useEffect(()=>{
    //     setlogin(localStorage.getItem('userId'))

    // },[])
    const [name, setname] = useState("");
    const [email, setemail] = useState("")
    const [message, setmessage] = useState("")
    const [error, seterror] = useState({})
    const navigate = useNavigate();
    function getvalues() {
        let newerror = {}
        if (name.length == 0) {
            newerror.name = "Name is required";


        }
        if (email.length == 0) {
            newerror.email = "Email is required";
        }
        else {
            const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
            const isemailvalidation = regex.test(email)
            console.log(isemailvalidation)
            if (isemailvalidation == false)
                newerror.email = "Invalid email format";

        }
        if (message.length == 0) {
            newerror.message = "Message is required";
        }
        seterror(newerror);


        if (Object.keys(newerror).length > 0) {
            return;
        }

        axios.post("http://localhost:5000/formfill", { name, email, message })
            .then((res) => {
                console.log(res.data.data)
                alert("submitted succesfully")
            })
            .catch((err) => {
                console.log("error", err)
                alert("submitted not successful")
            })

    }
    return (
        <div className="contactmain">
            <div className="contactmainseconddiv"><br />
                <h1 className="contactmainh1">Get IN Touch</h1>
                <p>Let's Talk</p><br />
                <p>I'm currently availabe to take on new projects.<br />so feel free to send me o message about anyting that you want me to work on.<br />You can contact anytime</p>
                <span>Email:</span><a href="">Shafnasaleem980@gmail.com</a><br />
                <span>Phone no:</span><a href="">98469935275</a><br />
                <span>Location:</span><a href="">Kerala,Malappuram</a><br />
                <br />
                {login == null ?
                    // <MdLogout size={30} onClick={logout} title="Logout" style={{ cursor: 'pointer' }} />
                    <MdLogin size={30} onClick={() => navigate("/login")} />
                    :
                    <FiLogOut  size={30} onClick={logout} title="Logout" style={{ cursor: 'pointer' }} />

                } <br/>
                            <a href={pdf} download>
    <Button text={"DOWNLOAD CV"} />
  </a>
            </div>
            <div className="contactinputdiv"><br />
                <form className="form" action="" method="post" encType="multipart/form-data" />
                <label>Your Name</label> <br />
                <input className="contactinputdivinput" type="text" placeholder="Enter Your Name" name={'name'} onChange={(e) => setname(e.target.value)} /><br />
                <div>{error.name ? <small>{error.name}</small> : ""}</div>
                <label>Your Email</label> <br />
                <input className="contactinputdivinput" type="text" placeholder="Enter Your Email" name={'email'} onChange={(e) => setemail(e.target.value)} /><br />
                <div>   {error.email ? <small>{error.email}</small> : ""}</div>
                <label>Your Message</label> <br />
                <input className="contactinputdivmessage" type="text" placeholder="Enter Your Message" name={"message"} onChange={(e) => setmessage(e.target.value)} /><br />
                <div>{error.message ? <small>{error.message}</small> : ""}</div>
                <Button text="Submitt now" onClick={getvalues} />



            </div>

        </div>
    )
}