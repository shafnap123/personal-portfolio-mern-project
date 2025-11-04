
import { formmodel } from "../FormModel.js";
import { v2 as cloudinary } from 'cloudinary';


export const addproject = async (req, res) => {
  try {
    const { projectname, description, technolgiesused,link} = req.body;
    let uploadResult 
    
    if (req.file) {



      
      uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              return reject(error);
            }
            resolve(result);
          }
        );
        stream.end(req.file.buffer); 
      });
    }

    
    await formmodel.insertOne({
      image: uploadResult.secure_url,
      projectname,
      description,
      technolgiesused,
      link
    });

    console.log("Project created successfully");
    res.status(201).json({ success: true });

  } catch (error) {
    console.error("Failed to create project:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export const findproject = async (req, res) => {
  try {
    const projectsadd = await formmodel.find({ isdelete: false })
    console.log(projectsadd)
    res.send({ projects: projectsadd })
  }
  catch (error) {
    console.log(error)

  }
}

export const findeditedproject = async (req, res) => {
  const projectid = req.query.projectid
  console.log(projectid)
  const project = await formmodel.findOne({ _id: projectid })
  // console.log(project,'kkkkkkkkkkkkkkkkk')
  res.json({ project: project })

}






export const projectedited = async (req, res) => {
  try {
    const projectid = req.query.projectid
    const projectdata = req.body;
    const imagedata = req.file;
    console.log(req.body, '/////////////////', req.file, projectid, ':::::::::::')
    let uploadresult = null
    if (req.file) {
      

      uploadresult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              console.error('error uploading to cloudinary', error);
              return reject(error)
            }
            resolve(result);
          }
        )
        stream.end(req.file.buffer);
      })
    }
    console.log(uploadresult, 'LLLLLLLLLLLLLLLLLLLLLL')
    // Build update object dynamically
    const updateFields = {};

    if (projectdata?.projectname) updateFields.projectname = projectdata.projectname;
    if (uploadresult?.secure_url) updateFields.image = uploadresult.secure_url
    if (projectdata?.technolgiesused) updateFields.technolgiesused = projectdata.technolgiesused;
    if (projectdata?.description) updateFields.description = projectdata.description;
    if (projectdata?.link) updateFields.link = projectdata.link;
  

    console.log(updateFields, '????????????????????????????????????????')
    const response = await formmodel.updateOne(

      { _id: projectid },
      {
        $set: updateFields
      }
    );

    console.log(response);
    res.send('Data updated successfully');
  } catch (error) {
    console.log('Data update failed', error);
    res.send('Update failed');
  }
}




export const deleteproject = async (req, res) => {
  try {
    const projectId = req.query.projectid;
    console.log(projectId);

    const deleteproject = await formmodel.updateOne(
      { _id: projectId },
      { $set: { isdelete: true } }
    );

    console.log(deleteproject);
    res.json({ deleteproject: deleteproject });

  } catch (error) {
    console.log(error);
    res.send('update failed');
  }
};

