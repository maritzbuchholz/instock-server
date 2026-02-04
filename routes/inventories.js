import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router
    .route("/")
    .get((req, res) => {
    try {
        res.json("Hello Inventories!");
    } catch (error) {
        res.status(400).send("Error");
    }
    })

export default router;