import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;


export function authentication(req, res, next) {
        const header = req.headers.authorization ;
        if (!header)
        {
            return res.status(401).json({message: "There is no token"}) ;
        }

        const token = header.split(" ")[1] ;
        if (!token)
            return res.status(401).json({message: "Invalid token format"}) ; 
            
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error)
            {
                return res.status(403).json({message: "Invalid token"}) ;
            }
            req.user = user ;
            next() ;
        }) ;
        
    } ;


