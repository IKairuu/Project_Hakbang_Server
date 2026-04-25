import jwt from "jsonwebtoken" ;
import * as dotenv from "dotenv" ;
dotenv.config() ;


export function authentication(req, res, next) {
        const header = req.headers.authorization ;
        if (!header)
        {
            return res.status(402).json({message: "There is no token", status: 402}) ;
        }

        const token = header.split(" ")[1] ;
        if (!token)
            return res.status(403).json({message: "Invalid token format", status : 403}) ; 
            
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error)
            {
                return res.status(404).json({message: "Invalid token", status : 404}) ;
            }
            req.user = user ;
            next() ;
        }) ;
        
    } ;


