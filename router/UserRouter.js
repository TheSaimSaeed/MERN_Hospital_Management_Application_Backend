import express from "express";
import { AdminRegister, Login, patientRegister,findAllDoctors, getUserDetails, LogoutAdmin, AddNewDoctor } from "../controller/UserController.js";
import { AdminAuthentication , PatientAuthentication } from "../middleWare/Auth.js";


const PatientRouter = express.Router();

PatientRouter.post("/patient/Register", patientRegister);
PatientRouter.post("/login", Login);
PatientRouter.post("/admin/newadmin",AdminAuthentication, AdminRegister); // Understd?
PatientRouter.get("/doctors",findAllDoctors);
PatientRouter.get("/admin/me",AdminAuthentication,getUserDetails);
PatientRouter.get("/patient/me",PatientAuthentication,getUserDetails);
PatientRouter.get("/admin/logout",AdminAuthentication,LogoutAdmin);//Why it is get type
PatientRouter.post("/doctor/addnew",AdminAuthentication,AddNewDoctor);

export default PatientRouter;
