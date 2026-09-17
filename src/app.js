import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//To handles middleware- use app.use()
app.use(express.json({
    limit: "16kb"
}));

app.use(urlencoded({
    limit: "16kb",
    extended: true
}));

app.use(cookieParser());

app.get("/test", (req, res) => {
    res.send("Server is working");
});


//import routs
import userRouter from "./routes/user.routes.js"


//route declaration

app.use("/api/v1/users", userRouter);

console.log("USER ROUTER MOUNTED");

export { app }

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import userRouter from "./routes/user.routes.js";

// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

// app.use(express.json({
//     limit: "16kb"
// }));

// app.use(express.urlencoded({
//     limit: "16kb",
//     extended: true
// }));

// app.use(cookieParser());

// app.get("/test", (req, res) => {
//     res.send("Server is working");
// });

// app.use("/api/v1/users", userRouter);

// export { app };