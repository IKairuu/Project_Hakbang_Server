import express from "express";
import {authorization} from "../middleware/auth.js" ;
import { addUserActivity, changeAboutUser, getUserActivity, getUserSavedScholarships, getUserSavedSchools, loginUser, postUserSavedScholarship, postUserSavedSchools, registerUser, removeUserActivity, removeUserSavedScholarship, removeUserSavedSchool, sendCodeUser, verifyUser } from "../controller/userController.js";
import { loginLimiter } from "../middleware/limiter.js";

const user = express.Router() ;

user.post("/auth/signup", authorization, registerUser) ; 
user.post("/login", loginLimiter, loginUser) ;
user.put("/auth/change-about-me", authorization, changeAboutUser) ;
user.post("/auth/post-activity", authorization, addUserActivity) ;
user.get("/auth/get-activities/:email", authorization, getUserActivity) ;
user.delete("/auth/remove-activities/:email", authorization,removeUserActivity) ;
user.get("/auth/get-saved-scholarship/:email", authorization, getUserSavedScholarships) ;
user.post("/auth/post-saved-scholarship", authorization, postUserSavedScholarship) ;
user.post("/auth/remove-saved-scholarship", authorization, removeUserSavedScholarship) ;
user.get("/auth/get-saved-schools/:email", authorization, getUserSavedSchools) ;
user.post("/auth/post-saved-schools", authorization, postUserSavedSchools) ;
user.post("/auth/remove-saved-school", authorization, removeUserSavedSchool) ;
user.post("/auth-user-email/:email",sendCodeUser)  ;
user.post("/verify", verifyUser)  ;

export default user ;
