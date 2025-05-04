
// const {mongoose} = required('mongoose');
import  mongoose from "mongoose";

export  const  dbConnection = async()=>{
   await mongoose.connect(process.env.MONGO_URI,{
        dbName:"Hospital_Management_FSD",
    }).then(()=>{console.log("Successfully Connected to the Database....")})
    .catch((err)=>{console.log(`There is error accured connecting database: ${err}`)});
}



