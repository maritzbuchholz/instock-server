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
            res.status(500).send("Error Occured on server");
        }
    })

router
    .route("/:id")
    .get(async (req, res) => {
        const warehouseId = req.params.id;
        const sql = `SELECT * FROM warehouses WHERE warehouses.id = ?`;
        try {
            const [results] = await connection.query(sql, [warehouseId]);
            if (results.length === 0) {
                return res.status(404).json({
                    message: `No warehouse found with id ${warehouseId}`
                });
            }
            res.json(results[0]);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error Occured on server");
        }
    })
export default router;