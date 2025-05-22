import express from "express";
import { GetAllMessages, SendMessage } from "../controller/messageController.js";
import {AdminAuthentication} from '../middleWare/Auth.js';

const MessageRouter = express.Router();

MessageRouter.post('/send',SendMessage);
MessageRouter.get('/allmessages',AdminAuthentication,GetAllMessages);

export default MessageRouter;

