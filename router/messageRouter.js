import express from "express";
import { SendMessage } from "../controller/messageController.js";


const MessageRouter = express.Router();

MessageRouter.post('/send',SendMessage);

export default MessageRouter;

