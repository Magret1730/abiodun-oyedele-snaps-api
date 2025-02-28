import { timeStamp } from "console";
import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

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

function writePhoto(data) {
    try {
        fs.writeFileSync("./data/photos.json", JSON.stringify(data, null, 4));
    } catch (error) {
        console.error("Error in writePhoto function", error);
    }
}

router.get("/", (req, res) => {
    try {
        const photos = readPhotos();

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
        const id = req.params.id;

        const {name, comment} = req.body;

        if (!name || !comment) {
            return res.status(400).json({error: "Name and comments are required!!!"});
        }

        const photos = readPhotos();

        const photo = getPhoto(id);
        if (!photo) {
            return res.status(404).json({error: "Photo not found!!!"});
        }

        const photoIndex = photos.findIndex((p) => p.id === id);
        if (photoIndex === -1) {
            return res.status(404).json({ error: 'Photo not found.' });
        }

        const newComment = {
            id: uuidv4(),
            name: name,
            comment: comment,
            timestamp: Date.now(),
        }

        // Ensures the comments array exists
        if (!Array.isArray(photos[photoIndex].comments)) {
            photos[photoIndex].comments = [];
        }

        photos[photoIndex].comments.unshift(newComment);

        writePhoto(photos);

        res.status(201).json(newComment);

    } catch (error) {
        res.status(500).json({error: "Error from post comments"});
    }
});

export default router;