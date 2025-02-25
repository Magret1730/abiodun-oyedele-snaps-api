import express from "express";
const router = express.Router();
// import crypto from "crypto";
// import photos from "../data/photos.json";
import fs from "fs";


function readPhotos() {
    try {
        const photosData = fs.readFileSync("./data/photos.json");
        const parsedData = JSON.parse(photosData);

        return parsedData;
    } catch (error) {
        console.error(error)
    }
}

router.get("/", (_req, res) => {
    try {
        const photos = readPhotos();

        res.status(200).json(photos);
    } catch (error) {
        console.error("Error from get photos /",error);
        res.status(500).json("Error from get photos")
    }
});

export default router;