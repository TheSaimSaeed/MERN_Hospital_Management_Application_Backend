
import mongoose from "mongoose";
import  validator  from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: [3, "Must Contain 3 characters"]
    },

    lastName: {
        type: String,
        required: true,
        minLength: [3, "Must Contain 3 characters"]
    },

    email: {
        type: String,
        required: true,
        validate: validator.isEmail,
    },

    phone: {
        type: String,
        required: true,
        minLength: [11, "Must have exact 11 characters."],
        maxLenght: [11, "Must have exact 11 characters."],
    },

    cnic: {
        type: Number,
        required: true,
        validator: [13, "CNIC must be 13 digits!"]
    },

    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },

    role:{
        type: String,
        enum:["Admin", "Patient", "Doctor"],
        required: true,
    },

    gender: {
        type: String,
        required: [true, "Gender Is Required!"],
        enum: ["Male", "Female"],
    },

    password:{
        type: String,
        select: false,
        minLength: [8, "Must have atleast 8 characters."],
    },

    DocDepartment:{
        type: String,
    },

    DocAvatar:{
        public_id: String,
        url: String,
    }





});


UserSchema.pre("save", async function (next){
    if(! this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

UserSchema.methods.VerifyPassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);
}

UserSchema.methods.GenerateJWToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRES,});
}

export const User = mongoose.model("User", UserSchema);