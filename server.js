import "dotenv/config";
import cors from "cors";
import express from "express";
import inventory from "./routes/inventory.js";
import warehouses from "./routes/warehouses.js";


const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json()); // allows parsing JSON data from req objects

app.use("/inventory", inventory);
app.use("/warehouses", warehouses);

app.listen(port, () => console.log(`Listening on ${port}`));