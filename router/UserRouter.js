import express from "express";
import { AdminRegister, Login, patientRegister } from "../controller/UserController.js";
const PatientRouter = express.Router();

PatientRouter.post("/patient/Register", patientRegister);
PatientRouter.post("/login", Login);
PatientRouter.post("/admin/newadmin", AdminRegister);

export default PatientRouter;
