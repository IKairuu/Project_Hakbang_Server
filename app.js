import express from "express" ;

const app = express() ;
const port = 5050 ;
import user from "./routes/userRoute.js" ;

app.use(express.json()) ;
app.use("/user", user) ;

app.get("/", (req, res) => {
    console.log("API is running") ;
}) ;

app.listen(port, function() {console.log(`Listening to http://localhost:${port}`)}); 