import mongoose from "mongoose";

const tweetsSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : true,
        required : true,
    },
    content : {
        type : String,
        lowercase : true,
        trim : true,
    },
}, {timestamps: true});

export const Tweets = mongoose.model("Tweets", tweetsSchema);
