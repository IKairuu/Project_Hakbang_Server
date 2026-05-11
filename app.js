import express from "express" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;

const app = express() ;
const port = process.env.PORT || 5050 ;
import user from "./routes/userRoute.js" ;
import college from "./routes/collegeRouter.js" ;
import chat from "./routes/chatRouter.js" ;
import scholar from "./routes/scholarRouter.js" ;
import center from "./routes/reviewCenterRouter.js" ;

app.use(express.json()) ;
app.use("/user", user) ;
app.use("/college", college) ;
app.use("/chat", chat) ;
app.use("/scholarship", scholar) ;
app.use("/review-hub", center) ;

app.get("/ping", (req, res) => {
    let response = res.status(200).json({message: "Connected to Server"}) ;
    return response ;
}) ;

app.listen(port, function() {console.log(`Listening to http://localhost:${port}`)}); 