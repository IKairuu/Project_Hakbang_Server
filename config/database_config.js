import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv" ;
process.config() ;

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
})

export const connect_database = async () =>
{
    try{
        await  prisma.$connect() ;
        console.log("DB Connected") ;
    }
    catch (error)
    {
        console.log(`DB Error ${error.message}`) ;
        throw new Error("Database Error: Cannot connect to Database")
        process.exit(1) ;
    }
}

export const disconnect_database = async () =>
{
    try{
        await  prisma.$disconnect() ;
        console.log("DB Disconnected") ;
    }
    catch (error)
    {
        console.log(`DB Error ${error.message}`) ;
        throw new Error("Database Error: Cannot connect to Database")
    }
}