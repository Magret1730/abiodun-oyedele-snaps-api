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

router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;

        const photos = readPhotos();

        const photo = photos.find((photo) => photo.id === id);

        if (photo) {
            console.log(photo);

            res.status(200).json(photo);
        } else {
            console.error("Photo not found in getPhotoById");
            res.status(404).json("Photo not found in getPhotoById");
        }
    } catch (error) {
        console.error("Error from get photosById", error);
        res.status(500).json("Error from get photosById");
    }
});

export default router;