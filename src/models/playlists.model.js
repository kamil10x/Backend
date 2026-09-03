import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
    },
    description : {
        type : String,
    },
    videos : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video",
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
}, {timestamps : true});

export const PlayList = mongoose.model("PlayList", playListSchema);
