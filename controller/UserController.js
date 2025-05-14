
import Errorhandler from "../middleWare/ErrorMiddleware.js";
import { catchAsyncErrors } from "../middleWare/AsyncErrorMiddleware.js";
import { User } from "../models/UserSchema.js";
import { GenerateJwtToken } from "../utils/JWTtoken.js";


export const patientRegister = async (req, res, next) => {
    const { firstName, lastName, cnic,password, email, phone, dob, gender, role } = req.body;
    if (!firstName || !lastName || !cnic || !password || !email || !phone || !dob) {
        return next(new Errorhandler("Please Fill All Patient fields!", 400));
    }
    let patient = await User.findOne({ email });

    if (patient) {
        return next(new Errorhandler("User already existed!", 400))
    }

    patient = await User.create({
        firstName, lastName, cnic,password, email, phone, dob, gender, role
    });

    GenerateJwtToken(patient, "Patient Registered succussfull!..",200,res);

}


export const Login = catchAsyncErrors((async (req, res, next) => {
    const { email, password, Confirmpassword, role } = req.body;
    if (!email || !password || !Confirmpassword || !role) {
        return next(new Errorhandler("Please Fill all the fields!", 400));
    }

    if (password != Confirmpassword) {
        return next(new Errorhandler("Invalid Email and password!", 400));
    }



    const user = await User.findOne({ email }).select("+password");
    if (!user) {

        return next(new Errorhandler(`User with Email: ${email} Not Found!`, 400));
    }

    const isPasswordCorrect = await user.VerifyPassword(password);

    if (!isPasswordCorrect) {
        return next(new Errorhandler("Invalid Email and password!", 400));
    }

    if (role != user.role) {
        return next(new Errorhandler("Role not found!"), 400);
    }


    GenerateJwtToken(user, "User logined successfully!", 200, res);
}))

export const AdminRegister = catchAsyncErrors(async(req, res, next)=>{
    const {firstName, lastName, cnic,password, email, phone, dob, gender } = req.body;
    if(!firstName || !lastName || !cnic || !password || !email || !phone || !dob || !gender ){
        return next(new Errorhandler("Please Fill all the fields!",400));
    }

    const isAlreadyRegister = await User.findOne({email});

    if(isAlreadyRegister){
        return next(new Errorhandler(`${isAlreadyRegister.role} with this email is already existed!`,400));
    }

    const Admin = User.create({
        firstName, lastName, cnic,password, email, phone, dob, gender, role: 'Admin'
    })

    res.status(200).json({
        message:"New Admin Registered succussfully!..",
        success: true,
    })

})