import express from "express";
import { chatMessage } from "./companion.controller.js";
const chat = express.Router();

chat.post("/message", chatMessage);

export default chat;
