import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

async function dbConnect() {
    try {
        const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`DataBase connected || Host: ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Failed: ", error);
        process.exit(1);
    }
}

export default dbConnect