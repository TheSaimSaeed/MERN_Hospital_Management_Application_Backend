import express from "express";
import { patientRegister } from "../controller/UserController.js";
const PatientRouter = express.Router();

PatientRouter.post("/patient/Register", patientRegister);

export default PatientRouter;
