
import Errorhandler from "../middleWare/ErrorMiddleware.js";

import { User } from "../models/UserSchema.js";

export const patientRegister = async (req, res, next)=>{
    const {firstName, lastName , cnic , email , phone , dob, gender, role} =req.body;
    if (!firstName || !lastName || !cnic || !email || !phone || !dob){
        return next(new Errorhandler("Please Fill All Patient fields!",400));
    }
    let patient = await User.findOne({email});

    if(patient){
        return next(new Errorhandler("User already existed!",400))
    }

    patient = await User.create({
        firstName, lastName , cnic , email , phone , dob,gender, role
    });

    res.status(200).json({
        success:true,
        message:"Patient Registered Succussfully!",
    });

}



