import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from '../utils/apiResponse.js';


const registerUser = asyncHandler( async (req, res) =>{
    // res.status(200).json({
    //     message : "ok",
    // })
    console.log("files:", req.files);
    console.log("body:", req.body);
    //1. get user details from frontend
    const {fullName, email, userName, password } = req.body;
    // console.log("Email: ", email);
    // console.log("Password: ", password);
    // console.log("Fullname: ",);
    

    //2. validation - not empty
    if(fullName === ""){
        throw new ApiError(400, "Full name is required");
    }
    if(email === ""){
        throw new ApiError(400, "Email is required");
    }
    if(password === ""){
        throw new ApiError(400, "Password is required");
    }
    if(userName === ""){
        throw new ApiError(400, "UserName is required");
    }
    if(!email.includes("@gmail.com")){
        throw new ApiError(400, "Invalid email");
    }

    console.log("Fullname: ", fullName);
    console.log("E-mail: ", email);
    console.log("Password: ", password);
    console.log("Username: ", userName);

    // if(
    //     [fullName, email, userName, password].some((field) => (
    //         field.trim() === ""
    //     ))
    // ){
    //     throw new ApiError(400, "All fields are required");
    // }

    //3. check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })
    
    if(existedUser){
        throw new ApiError(409, "User name or email already exist");
    }

    //4. check for images, check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImgLocalPath = req.files?.coverImg?.[0]?.path;

    console.log(avatarLocalPath);
    console.log(coverImgLocalPath);
    
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required");
    }

    //5.upload them to cloudinary, avatar

    const avatar =  await uploadCloudinary(avatarLocalPath);
    const coverImg = await uploadCloudinary(coverImgLocalPath);
    console.log(avatar);
    console.log(coverImg);
    

    if(!avatar ){
        throw new ApiError(400, "Avatar file not uploaded");
    }

    //6. create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImg : coverImg?.url || "",
        email,
        password,
        userName : userName.toLowerCase(),
    });

    //7. remove password and refresh token field from response

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //8. check for user creation

    if(!createdUser){
        throw new ApiError(500, "Error while regestering user");
    }

    //9. return res
    return res.status(201).json(
        new ApiResponse(200, "User registered successfully", createdUser)
    );

} )

export  {registerUser}