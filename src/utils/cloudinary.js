import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});

//For uploading files

const uploadCloudinary = async (localFile) => {
    try {
        if(!localFile){
            return null;
        }
        //upload localfile in cloudinary
        const response = await cloudinary.uploader.upload(localFile, {
            resource_type : "auto",
        })
        console.log("File is uploaded on cloudinary");
        console.log("File url: ", response.url);
        //return response
        return response;
    } catch (error) {

        fs.unlinkSync(localFile);//delete the localFile from our resource
        return null;
    }
}


cloudinary.v2.uploader
.upload("dog.mp4", {
  resource_type: "video", 
  public_id: "my_dog",
  overwrite: true, 
  notification_url: "https://mysite.example.com/notify_endpoint"})
.then(result=>console.log(result));