
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import {dbConnection} from './Database/databaseConnect.js';
import MessageRouter from './router/messageRouter.js'
import { ErrorMiddlewareMesg } from './middleWare/ErrorMiddleware.js';

config({path:'./config/config.env'})

const app = express();

app.use(cors({
    origin:[process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    methods:["GET", "POST" , "DELETE" , "PUT"],
    credentials: true,

}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
);

app.use("/api/v1/message",MessageRouter);

dbConnection();

app.use(ErrorMiddlewareMesg)
export default app;