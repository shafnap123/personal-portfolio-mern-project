import mongoose from "mongoose";

const formSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    projectname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    technolgiesused:{
        type:String,
        required:true
    },
     link:{
    type:String,
    required:true
  },
isdelete:{type:Boolean,default:false}


})
const formmodel=mongoose.model("form",formSchema)
export {
    formmodel
}