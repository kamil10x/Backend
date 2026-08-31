import mongoose from "mongoose";
import dbConnect from "./db/index.js";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";

dotenv.config({
    path: "./.env"
})

//calling dataBase connection
dbConnect();


// Another method to connect databse
// import express from "express";
// const app = express();

// ( async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
//         console.log(`Database Connected  Host: ${connectionInstance.connection.host}`);
        
//         app.on("error", (error) => {
//             console.log("Connection Failed: ", error);
//             throw err
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("Applicaiton is running on post : ", process.env.PORT);
//         })
//     } catch (error) {
//         console.log("Error ",error);
        
//     }
// }
// )()