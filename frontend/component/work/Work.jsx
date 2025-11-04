import axios from 'axios';
import { Button } from '../../public/pages/button/Button'
import './Work.css'
import { useRef, useState } from 'react';
export function Work() {
    

    const [projectname, setprojectname] = useState('')
    const [technolgiesused,settechnolgiesused]=useState('')
    const [description, setdescription] = useState('')
    const [image, setImage] = useState('')
    const [imageurl, setImageurl] = useState({})
    const [link,setlink]=useState('')
    console.log(imageurl, '/////////')

    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        console.log("sssss")
        const file = e.target.files[0];
        setImageurl(file)
        console.log(file, "pppppp")
        if (file) {
            const imageurl = URL.createObjectURL(file);
            setImage(imageurl)
        }

    }
  





    const getvalue = () => {
        // if (!projectname || !description || !imageurl) {
        //     alert("Please fill all fields and choose an image");
        //     return;
        // }

        const formData = new FormData();
        formData.append('projectname', projectname);
        formData.append('technolgiesused',technolgiesused)
        formData.append('description', description);
        formData.append('image', imageurl); 
         formData.append ('link', link);
        // field name must match backend multer

        axios.post('http://localhost:5000/addproject', formData)
            .then((res) => {
                console.log(res.data);
                alert("Success");
            })
            .catch((err) => {
                console.log(err, "error");
                alert("Error");
            });
    
    }
    





    return (
        <div className="main">
            < form className="work-form"  >
                <h1>ADD Latest work</h1><br /><br />

                <input type="text" placeholder="projecname" value={projectname} onChange={(e) => setprojectname(e.target.value)} />
                <br /><br />
                <input type='text' placeholder='text which technolgies used' value={technolgiesused} 
                    onChange={(e) => settechnolgiesused(e.target.value)} /><br /><br />
                <input type='text' placeholder='description' value={description}
                    onChange={(e) => setdescription(e.target.value)} /><br /><br />
                     <input type='text' placeholder='link' value={link}
                    onChange={(e) => setlink(e.target.value)} /><br/><br/>

                {image == '' ? <div className='labeldiv' onClick={handleDivClick} >
                    <label className="custom-file-upload">Choose an image</label>
                    <input
                    name='image'
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e)}
                        style={{ display: 'none' }}

                    />

                </div> : <img value='choose an image' src={image} width={'200px'} ></img>}

                <br />

                <Button type='button' text="Add A Work" onClick={getvalue} />

            </form>
        </div>

    )
}