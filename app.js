import express from "express" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;

const app = express() ;
const port = process.env.PORT || 5050 ;
import user from "./routes/userRoute.js" ;
import college from "./routes/collegeRouter.js" ;

app.use(express.json()) ;
app.use("/user", user) ;
app.use("/college", college) ;

app.get("/", (req, res) => {
    console.log("API is running") ;
}) ;

app.listen(port, function() {console.log(`Listening to http://localhost:${port}`)}); 