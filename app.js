import express from "express" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;

const app = express() ;

import user from "./routers/userRoute.js" ;
import college from "./routers/collegeRouter.js" ;
import chat from "./routers/chatRouter.js" ;
import scholar from "./routers/scholarRouter.js" ;
import center from "./routers/reviewCenterRouter.js" ;
import { authentication } from "./middleware/auth.js";

app.use(express.json()) ;
app.use("/auth/college", authentication, college) ;
app.use("/auth/scholarship", authentication, scholar) ;
app.use("/auth/review-hub", authentication, center) ;
app.use("/auth/chat", authentication,chat) ;
app.use("/user", user) ;

export default app ;

