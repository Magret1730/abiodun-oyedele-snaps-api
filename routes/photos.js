import express from "express";
const router = express.Router();
// import crypto from "crypto";
import fs from "fs";


function readPhotos() {
    try {
        const photosData = fs.readFileSync("./data/photos.json");
        const parsedData = JSON.parse(photosData);

        return parsedData;
    } catch (error) {
        console.error("Error from readPhotos", error)
    }
}

function getPhoto(id) {
    try {
        const photos = readPhotos();

        const photo = photos.find((photo) => photo.id === id);

        return photo;
    } catch (error) {
        console.error("Error from getPhoto", error)
    }
}

router.get("/", (req, res) => {
    try {
        const id = req.params.id;

        const photos = readPhotos(id);

        // console.log(photos);

        res.status(200).json(photos);
    } catch (error) {
        console.error("Error from get photos /",error);
        res.status(500).json({error: "Error from get photos route"});
    }
});

router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;

        const photo = getPhoto(id);

        if (photo) {
            res.status(200).json(photo);
        } else {
            console.error("Photo not found in getPhotoById");
            res.status(404).json("Photo not found in getPhotoById route");
        }
    } catch (error) {
        console.error("Error from get photosById", error);
        res.status(500).json({error: "Error from get photos by Id route"});
    }
});

router.get("/:id/comments", (req, res) => {
    try {
        const id = req.params.id;

        const photo = getPhoto(id);
        // console.log("Photo from comments by ID",photo);

        if (photo) {
            res.status(200).json(photo.comments)

        } else {
            console.error("Photo comments not found in getComments");
            res.status(404).json("Photo comments not found in getComments");
        }

    } catch (error) {
        console.error("Error from get comments", error);
        res.status(500).json({error: "Error from get comments route"});
    }
});

router.post("/:id/comments", (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({error: "Error from post comments"});
    }
});

export default router;