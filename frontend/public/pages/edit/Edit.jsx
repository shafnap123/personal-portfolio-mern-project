import { useParams } from 'react-router-dom'
import './Edit.css'
import { use, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Button } from '../button/Button'
import { useNavigate } from 'react-router-dom';

 
export function Edit() {

    const [projectname, setprojectname] = useState("")
    const [description, setdescription] = useState("")
    const [technolgiesused, settechnogiesused] = useState("")
    const [image, setimage] = useState(null)
    const [previewImage, setPreviewImage] = useState('');
      const [link,setlink]=useState('')
    console.log(image, '?????????????')
    // const [previewimage,setpreviewimage]=useState('')

    let { projectid } = useParams()
    console.log(projectid)
    const [projectdetails, setprojectdetails] = useState({})
    console.log(projectdetails)
    useEffect(() => {
        axios.get(`http://localhost:5000/findeditedproject?projectid=${projectid}`)
            .then((res) => {
                const project = res.data.project
                setprojectdetails(project)
                setPreviewImage(project.image)
                console.log("sucess", res.data.project)

            })
            .catch((error) => {
                console.error('error is find ', error)
            })
    }, [projectid])

    const  navigate=useNavigate();
    const editproject = () => {
        const formData = new FormData();
        formData.append("projectname", projectname || projectdetails.projectname)
        formData.append("description", description || projectdetails.description)
        formData.append("technolgiesused", technolgiesused|| projectdetails.technolgiesused)
        formData.append("link",link||projectdetails.link)
        // formData.append("image", image || previewImage);
        if (image) {
  formData.append("image", image); // Only if a new image file is selected
}
        console.log(formData, '??????????????????', projectdetails)

    

        axios.post(`http://localhost:5000/projectedited?projectid=${projectid}`,formData).then(()=>{
        alert("edit this project")
         navigate('/');
        console.log(formData)
        })
    }
    return (
        <div className="editmainpage">

            {/* <div className="imagemeditaindiv">
                {image!=null?
                <img src={projectdetails.image} />:
                <input type="file" onChange={(e)=>setimage(e.target.files)}></input>
            }
            </div> */}

            <div className="gulbsecond">
                <img className='gulabimg' src={previewImage}></img>

                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setimage(file);
                            setPreviewImage(URL.createObjectURL(file));
                        }
                    }}
                />

            </div>


            <div className="inputeditmaindiv">
                <label>projecrname</label><br />
                <input type="text" placeholder="Projectname" defaultValue={projectdetails.projectname} onChange={(e) => { setprojectname(e.target.value) }} /><br /><br /><br />
                <label>which technolgies used</label><br />
                <input type="text" placeholder="which technolgies used" defaultValue={projectdetails.technolgiesused} onChange={(e) => { settechnogiesused(e.target.value) }} /><br /><br /><br />
                <label>description</label><br />
                <input type="text" placeholder="Description" defaultValue={projectdetails.description} onChange={(e) => { setdescription(e.target.value) }} /><br /><br /><br />
                 <label>Link</label><br />
                 <input type="text" placeholder="link" defaultValue={projectdetails.link} onChange={(e) => { setlink(e.target.value) }}/><br /><br /><br />
                <Button onClick={editproject} text="Submit" />

            </div>
        </div>
    )

}