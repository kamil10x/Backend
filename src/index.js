import dbConnect from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8000;
//calling dataBase connection
dbConnect()//it returns a promise since we have used aync
.then(() => {
    app.on("error",(err) => {
        console.log("OOPs!! Could not connected to server, Error: ", err);
        
    })

    app.listen(port, () => {
        console.log(`Application is running on port ${port}`);
    })
})
.catch((err) => {
    console.log("DataBase Connection errror: ", err);
    
})


















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