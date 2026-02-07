import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.route("/").get(async (req, res) => {
    const sql = `
        SELECT 
            inventories.id, 
            warehouses.warehouse_name, 
            inventories.item_name, 
            inventories.description, 
            inventories.category, 
            inventories.status, 
            inventories.quantity
        FROM inventories 
        JOIN warehouses ON inventories.warehouse_id = warehouses.id
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
    const inventoriesId = req.params.id;
    const sql = `
        SELECT 
            inventories.id, 
            warehouses.warehouse_name, 
            inventories.item_name, 
            inventories.description, 
            inventories.category, 
            inventories.status, 
            inventories.quantity
        FROM inventories 
        JOIN warehouses ON inventories.warehouse_id = warehouses.id
        WHERE inventories.id = ?
    `;
    try {
        const [results] = await connection.query(sql, [inventoriesId]);
        if (results.length === 0) {
                return res.status(404).json({
                message: `No inventory item found with id ${inventoriesId}`
            });
        }
        res.json(results[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Occured on server");
    }
})

export default router;