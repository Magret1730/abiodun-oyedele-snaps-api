import express from "express";
const router = express.Router();
import fs from "fs";

function readTags() {
    try {
        const tagsData = fs.readFileSync("./data/tags.json");
        const parsedTags = JSON.parse(tagsData);

        return parsedTags;
    } catch (error) {
        console.error("Error from readTags function", error);
    }
}

router.get("/", (req, res) => {
    try {
        const tags = readTags();
        // console.log("Tags from get tags", tags);
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error from get tags route", error);
        res.status(404).json({error: "Error from get tags route"});
    }
});

export default router;