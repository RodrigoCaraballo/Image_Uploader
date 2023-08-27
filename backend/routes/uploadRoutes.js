import express from "express";
import multer from "multer"

import { uploadImage } from "../controllers/uploadController.js";

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp/upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storageConfig })

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single('file'), uploadImage);

export {uploadRouter};