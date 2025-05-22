
import Errorhandler, { ErrorMiddlewareMesg } from "../middleWare/ErrorMiddleware.js";
import {catchAsyncErrors} from '../middleWare/AsyncErrorMiddleware.js';
import { Message } from "../models/MessageSchema.js";


export const SendMessage = async (req, res , next)=>{
   
    const {firstName , lastName , email , phone , message} = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
       return next(new Errorhandler("Please Fill All Fields",400));
    }

    await Message.create({firstName , lastName , email , phone , message});
    return res.status(200).json({
        success: true,
        message: "Messaged sent succuessfully",
    })

};


export const GetAllMessages = catchAsyncErrors(async(req, res, next)=>{
    const allMessages = await Message.find();

    res.status(200).json({
        success: true,
        message:"All messages are retrieved succuessfully!..",
        allMessages
    })
})