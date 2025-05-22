import { User } from "../models/UserSchema.js";
import { catchAsyncErrors } from "./AsyncErrorMiddleware.js";
import jwt, { decode } from "jsonwebtoken";
import Errorhandler from "./ErrorMiddleware.js";


export const AdminAuthentication = catchAsyncErrors(async(req, res, next)=>{
    //This is Authentication
    const token = req.cookies.AdminToken; //May be error
    if(!token){
        return next( new Errorhandler("Admin is not Authenticated!",400));
    }
    
    //This is Authorization
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(decoded.role !== 'Admin'){
        return next(new Errorhandler(`${req.user.role} is not authorized for this resource!`,403));//403 is for not authorized

    }

    next();

})

export const PatientAuthentication = catchAsyncErrors(async(req, res,next)=>{
     //This is Authentication
    const token = req.cookies.PatientToken; //May be error
    if(!token){
        return next( new Errorhandler("Patient is not Authenticated!",400));
    }
    
    //This is Authorization
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(decoded.role !== 'Patient'){
        return next(new Errorhandler(`${req.user.role} is not authorized for this resource!`,403));//403 is for not authorized

    }

    next();

})