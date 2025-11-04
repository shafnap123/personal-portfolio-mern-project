import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
// import fs from 'fs';
import dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';
// import { formfill } from '../controller/Controller.js';
import { addproject, deleteproject, findeditedproject, findproject, projectedited,  } from './model/FormController/FormController.js';
import { userlogin, usersignup } from './controller/LoginController.js';
import { formfill } from './controller/Controller.js';



const app = express();
const PORT = 5000;
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('public'));

// // Ensure image folder exists
// if (!fs.existsSync('public')) {
//   fs.mkdirSync('public');
// }

// // Your multer storage setup...
// const storage = multer.diskStorage({
//   destination: 'public',
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: 'djeysit2j',
  api_key: '551499147432118',
  api_secret: 'fDL315x5lyyDZz3BVuEqy5Buzes'
});



mongoose.connect('mongodb://localhost:27017/myportfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("connect to mongodb"))
  .catch(err => console.error("mongodb connected to failed", err))



app.get("/", (req, res) => {
  res.send("hllo")
})
app.post("/formfill", formfill)
app.post("/addproject", upload.single('image'), addproject)
app.get('/findproject', findproject)
app.get('/findeditedproject',findeditedproject)
app.post('/projectedited',upload.single('image'),projectedited)
app.get('/deleteproject', deleteproject)
app.post('/usersignup',usersignup)
app.post('/userlogin',userlogin)

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

