// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import {upload} from "../middleware/multer.middleware.js";

// const router = Router();

import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

console.log("USER ROUTER LOADED");

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImg",
            maxCount: 1
        }
    ]),
    registerUser
    )


router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;

// router.route("/register").post(
//     upload.fields([
//         {
//             name : "avatar",
//             maxCount : 1
//         },
//         {
//             name : "coverImg",
//             maxCount : 1
//         }
//     ]) ,
//     registerUser
// );
// router.route("/register").post(
//     (req, res, next) => {
//         upload.fields([
//             {
//                 name: "avatar",
//                 maxCount: 1
//             },
//             {
//                 name: "coverImg",
//                 maxCount: 1
//             }
//         ])(req, res, (err) => {
//             if (err) {
//                 // Catches busboy's "Unexpected end of form" and other multer errors
//                 return res.status(400).json({
//                     success: false,
//                     message: "File upload failed: " + err.message
//                 });
//             }
//             next();
//         });
//     },
//     registerUser
// );

// export default router