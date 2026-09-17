import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        avatar: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: [true, "Please Enter password"],
        },

        coverImg: {
            type: String,
        },

        refreshToken: {
            type: String,
        },

        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ]
    },
    {
        timestamps: true
    }
);


// Password encryption middleware
userSchema.pre("save", async function () {

    console.log("PRE-SAVE HOOK STARTED");

    if (!this.isModified("password")) {
        console.log("Password is not modified");
        return;
    }

    console.log("Hashing password...");

    this.password = await bcrypt.hash(
        this.password,
        10
    );

    console.log("Password hashed successfully");
});


// Check password
userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(
        password,
        this.password
    );

};


// Generate Access Token
userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    );

};


// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id,
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    );

};


export const User = mongoose.model(
    "User",
    userSchema
);