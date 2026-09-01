import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile : {
        type : String,
        required : true,
    },
    thumbNail : {
        type : String,
        required : true,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    title : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        lowercase : true,
    },
    duration : {
        type : Number,
        required : true,
    },
    views : {
        type : Number,
        default : 0,
        required : true
    },
    isPublished : {
        type : Boolean,
        required : true,
        enum : ["Yes", "No"]
    },

}, {timestamps : true});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);