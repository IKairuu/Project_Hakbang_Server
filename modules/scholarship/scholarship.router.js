import express from "express";
import { scholarshipList } from "./scholarship.controller.js";

const scholar = express.Router();

scholar.get("/active-scholarships", scholarshipList);
export default scholar;
