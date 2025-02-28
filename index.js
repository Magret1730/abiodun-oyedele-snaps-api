import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import photosRoute from "./routes/photos.js";
import tagsRoute from "./routes/tags.js";

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8081;


app.use("/photos", express.static("public/images"));

app.use("/photos", photosRoute);
app.use("/tags", tagsRoute);

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`);
});