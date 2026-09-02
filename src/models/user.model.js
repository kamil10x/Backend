import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        required : true,
        trim : true,
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
    },
    avatar : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : ['true', "Please Enter password"],
    },
    coverImg : {
        type : String,
    },
    refreshToken : {
        type : String,

    },
    watchHistory: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Video",
        }
    ]
}, { timestamps: true })

//middleware - used to encrypyt password before saving (here it save only when password is modified and 1st time only)
userSchema.pre("save",async function (next) {
    if(!this.isModified()){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//User defined method to check whether password is correct or not
userSchema.methods.isPasswordCorrect = async (password) => {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        //payload
        {
            _id : this._id,
            email : this.email,
            userName : this.userName,
            fullName : this.fullName
        },
        
        process.env.ACCESS_TOKEN_SECRET,
        //object
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : REFRESH_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User", userSchema);