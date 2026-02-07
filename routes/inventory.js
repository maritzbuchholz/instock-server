import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.route("/").get(async (req, res) => {
    const sql = `
        SELECT 
            inventory.*, 
            warehouses.warehouse_name 
        FROM inventory 
        JOIN warehouses ON inventory.warehouse_id = warehouses.id
    `;
    try {
        const [results] = await connection.query(sql);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Occured on server");
    }
})

router.route("/:id").get(async (req, res) => {
    const inventoryId = req.params.id;
    const sql = `
        SELECT 
            inventory.*, 
            warehouses.warehouse_name 
        FROM inventory 
        JOIN warehouses ON inventory.warehouse_id = warehouses.id
        WHERE inventory.id = ?
    `;
    try {
        const [results] = await connection.query(sql, [inventoryId]);
        if (results.length === 0) {
                return res.status(404).json({
                message: `No inventory item found with id ${inventoryId}`
            });
        }
        res.json(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Occured on server");
    }
})

export default router;