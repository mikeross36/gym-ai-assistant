import express from "express";
import { sendAnswer } from "../controllers/chatbotController";

const chatRouter = express.Router();

chatRouter.post("/", sendAnswer);

export default chatRouter;
