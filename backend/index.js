import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { uploadRouter } from "./routes/uploadRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());

const whiteList = [
    process.env.FRONTEND_URL
];

const corsOption = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Cors Error'))
        }
    }
}

app.use(cors(corsOption));
app.use('/', uploadRouter);

const port = 3000;
app.listen(port);