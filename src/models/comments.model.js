import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    video : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Video",
    },
    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "Video",
    }
}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);
