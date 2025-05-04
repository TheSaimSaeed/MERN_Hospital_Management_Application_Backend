
import mongoose from "mongoose";
import validator from "validator";

const MessageSchema = new mongoose.Schema({
    firstName:{
       type: String,
       required:true,
       minLength:[3,"Must Contain 3 characters"]
    },

    lastName:{
        type: String,
        required:true,
        minLength:[3,"Must Contain 3 characters"]
    },

    email:{
        type:String,
        required: true,
        validate: validator.isEmail,
    },

    phone :{
        type:String,
        required:true,
        minLength:[11,"Must have exact 11 characters."],
        maxLenght:[11,"Must have exact 11 characters."],
    },

    message:{
        type:String,
        required:true,
        minLength:[10,"Must have atleast 10 characters."],
    }

})

export const Message = mongoose.model("Message",MessageSchema)