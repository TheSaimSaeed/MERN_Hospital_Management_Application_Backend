
import Errorhandler from "../middleWare/ErrorMiddleware.js";
import { catchAsyncErrors } from "../middleWare/AsyncErrorMiddleware.js";
import { User } from "../models/UserSchema.js";
import { GenerateJwtToken } from "../utils/JWTtoken.js";
import cloudinary  from 'cloudinary';


export const patientRegister = async (req, res, next) => {
    const { firstName, lastName, cnic, password, email, phone, dob, gender, role } = req.body;
    if (!firstName || !lastName || !cnic || !password || !email || !phone || !dob) {
        return next(new Errorhandler("Please Fill All Patient fields!", 400));
    }
    let patient = await User.findOne({ email });

    if (patient) {
        return next(new Errorhandler("User already existed!", 400))
    }

    patient = await User.create({
        firstName, lastName, cnic, password, email, phone, dob, gender, role
    });

    GenerateJwtToken(patient, "Patient Registered succussfull!..", 200, res);

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
}));




export const AdminRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, cnic, password, email, phone, dob, gender } = req.body;
    if (!firstName || !lastName || !cnic || !password || !email || !phone || !dob || !gender) {
        return next(new Errorhandler("Please Fill all the fields!", 400));
    }

    const isAlreadyRegister = await User.findOne({ email });

    if (isAlreadyRegister) {
        return next(new Errorhandler(`${isAlreadyRegister.role} with this email is already existed!`, 400));
    }

    const Admin = User.create({
        firstName, lastName, cnic, password, email, phone, dob, gender, role: 'Admin'
    })

    res.status(200).json({
        message: "New Admin Registered succussfully!..",
        success: true,
    })

})


export const findAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: 'Doctor' });
    res.status(200).json({
        success: true,
        doctors,
    })
})



export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    })
})


export const LogoutAdmin = catchAsyncErrors((req, res, next) => {
    res.status(200).cookie("AdminToken", null, {
        httpOnly: true, //Understd ?
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Logout Successfully!"
    })
})


//This function used to register the new doctor
export const AddNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length===0) {
        return next(new Errorhandler("Doctor Avatar is Required", 400));
    }

    const { DocAvatar } = req.files;
    const allowedFormates = ['image/png', 'image/jpeg', 'image/webp'];

    if (!allowedFormates.includes(DocAvatar.mimetype)) {
        return next(new Errorhandler("This File formate is not supported", 400));
    }

    const {
        firstName, lastName, cnic, password, email, phone, dob, gender, DocDepartment
    } = req.body;

    if (
        !firstName || !lastName || !cnic || !password || !email || !phone || !dob || !gender || !DocDepartment || !DocAvatar
    ) {
        return next(new Errorhandler("Fill all the fileds!"), 400)
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new Errorhandler(`${isRegistered.role} is already registered with this email. `, 400), 400)
    }

    const cloudinaryResponse = cloudinary.uploader.upload(
        DocAvatar.tempFilepath,
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "CloudinaryError:",
            cloudinaryResponse.error || "Unknown Cloudinary Error",
        );

        return next(new Errorhandler("Failed to upload Doctor Avatar.", 400));
    }

    const doctor = await User.create({
        firstName, lastName, cnic, password, email, phone, dob, gender, DocDepartment, 
        role: "Doctor",
        DocAvatar: 
        { public_id: cloudinaryResponse.public_id, 
            url: cloudinaryResponse.secure_url }

    });

    res.status(200).json({
        success:true,
        message:"Doctor Succussfully Registered!",
        doctor,
    });


});