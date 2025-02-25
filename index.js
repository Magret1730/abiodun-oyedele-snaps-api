import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";

app.use(cors());
app.use(express.json());

app.use("/photos", express.static("public/images"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`);
});