import express from "express";
import { scholarshipList } from "./scholarController.js";

const scholar = express.Router();

scholar.get("/active-scholarships", scholarshipList);
export default scholar;
