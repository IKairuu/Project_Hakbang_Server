import express from "express";
import {authentication} from "../middleware/auth.js" ;
import { addUserActivity, changeAboutUser, getUserActivity, getUserSavedScholarships, getUserSavedSchools, loginUser, postUserSavedScholarship, postUserSavedSchools, registerUser, removeUserActivity, removeUserSavedScholarship, removeUserSavedSchool } from "../controller/userController.js";

const user = express.Router() ;

user.post("/signup", registerUser) ; 
user.post("/login", loginUser) ;
user.put("/auth/change-about-me", authentication, changeAboutUser) ;
user.post("/auth/post-activity", authentication, addUserActivity) ;
user.get("/auth/get-activities/:email", authentication, getUserActivity) ;
user.delete("/auth/remove-activities/:email", authentication,removeUserActivity) ;
user.get("/auth/get-saved-scholarship/:email", authentication, getUserSavedScholarships) ;
user.post("/auth/post-saved-scholarship", authentication, postUserSavedScholarship) ;
user.post("/auth/remove-saved-scholarship", authentication, removeUserSavedScholarship) ;
user.get("/auth/get-saved-schools/:email", authentication, getUserSavedSchools) ;
user.post("/auth/post-saved-schools", authentication, postUserSavedSchools) ;
user.post("/auth/remove-saved-school", authentication, removeUserSavedSchool) ;

export default user ;
