import { useEffect, useState } from 'react'
import { Button } from '../public/pages/button/Button'
import './MyWork.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { deleteproject } from '../../backend/model/FormController/FormController'

export function MyWork() {
    const adminId =localStorage.getItem('adminId')
    const [render, setrender] = useState([])
    const [refresh, setrefresh]=useState(true)
    useEffect(() => {
        axios.get('http://localhost:5000/findproject').then((res) => {
            setrender(res.data.projects)
        })
    }, [refresh])

    // function gotodelete(projectid){
    //     try{
    //     axios.get(`http://localhost:5000/deleteproject?projectid=${projectid}`).then((res)=>{
    //         console.log('delete project',res.data.deleteproject)
    //         alert("deleted data")
    //     })
    // }catch(error){
    //     console.log(error)
    //     alert("failed")
    // }
    // }
    async function gotodelete(projectid) {
        try {
            axios.get(`http://localhost:5000/deleteproject?projectid=${projectid}`);
            console.log('Delete project:');
            alert("Project deleted successfully");
             setrefresh(!refresh)
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete project");
        }
    }


    const navigate = useNavigate();
    function gotoedit(projectid) {
        console.log(projectid)
        navigate(`/edit/${projectid}`)
    }
    const works = [
        { title: "School Website", usinglanguge: "HTML,CSS", image: "/schoolwebsite.png", description: "This is a static school website designed using HTML and CSS. The site includes key sections such as a homepage, student mark sheet display, student achievement highlights, and detailed information about the school's facilities.This project focuses on presenting school data clearly using structured HTML, with CSS used for layout and visual styling. No JavaScript or responsive design is included, making it ideal for demonstrating foundational web development skills." },
        { title: "Todolist", usinglanguge: "Html,CSS,JavaScript", image: "/todolist.png", description: "This is a simple to-do list application created using HTML, CSS, and JavaScript. The app allows users to enter tasks, add them to a list, and delete tasks when completed. All functionality is handled on the front end using JavaScript, with no backend or database. The layout is static and designed for desktop use, with no responsive design. This project demonstrates basic DOM manipulation, event handling, and state management in vanilla JavaScript." },

    ]
    return (
        <div className="myworkmain">
            <div className='myworkmainh1'>
                <h1>My work</h1>
            </div>


            <div className='mainworkpic'>
                {render.map((value, index) => (
                    <div className='myworkmapdiv' key={index} >
                        <h2 className='myworkh2'>{value.projectname}</h2><br />
                        <p className='mainworkusinglanguge'>Technologisused:{value.technolgiesused}</p><br />
                        <img className='myworkimg' src={value.image} /><br />
                        <p className='mainworkdescription'>{value.description}</p>
                         <a className="mainworka" href={value.link}>{value.link}</a>
                         {adminId  ? 
                        <div className='buttonrow'>
                            
                            
                            <Button text="Edit" onClick={() => gotoedit(value._id)} />
                            <Button text="Delete" onClick={() => gotodelete(value._id)} />
                                
 
                        </div>
                        

                         :''}
                    </div>




                ))}
                 {adminId  ?

                <div className='adddiv'>
                    <Button text="Add" onClick={() => { window.location = "/page" }} />
                </div>
                 :''}
            </div>

        </div>
    )
}