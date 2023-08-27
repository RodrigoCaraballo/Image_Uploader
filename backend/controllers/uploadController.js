import fs from 'fs';

import { cloudinary } from "../config/cloudinary.js";

export async function uploadImage(req, res) {

    const generatedFilename = req.file.filename;

    await cloudinary.uploader.upload(
        `./temp/upload/${generatedFilename}`,
        {
            public_id: `uploadImageAPI/${generatedFilename.split('.')[0]}`,
            resource_type: 'auto',
            invalidate: true,
            invalidate_after: 86400,
        })
        .then((response) => {
            console.log(response.secure_url);
            res.status(200).json({ url: response.secure_url });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ msg: 'Something went wrong, please try again' });
        })
        .finally(() => {
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
        })
}
