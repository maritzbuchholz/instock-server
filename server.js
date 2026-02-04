import "dotenv/config";
import cors from "cors";
import express from "express";


const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json()); // allows parsing JSON data from req objects



app.listen(port, () => console.log(`Listening on ${port}`));