import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadCloudinary = async (localFile) => {
    try {
        if (!localFile) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto",
        });

        console.log("File is uploaded on Cloudinary");
        console.log("File URL:", response.url);

        // Delete local file after successful upload
        fs.unlinkSync(localFile);

        return response;

    } catch (error) {
        console.log("Cloudinary upload error:", error);

        // Delete local file if upload failed
        if (localFile && fs.existsSync(localFile)) {
            fs.unlinkSync(localFile);
        }

        return null;
    }
};

export { uploadCloudinary };