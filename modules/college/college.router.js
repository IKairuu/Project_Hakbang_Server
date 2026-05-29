import express from "express";
import { collegeList } from "./college.controller.js";

const collegeRouter = express.Router();

collegeRouter.get("/available-colleges", collegeList);
export default collegeRouter;
