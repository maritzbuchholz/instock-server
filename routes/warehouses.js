import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router
    .route("/")
    .get(async (req, res) => {
        const sql = "SELECT * FROM warehouses";
        try {
            const [results] = await connection.query(sql);
            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(400).send("Error");
        }
    })
export default router;