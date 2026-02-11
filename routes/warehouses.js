import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.route("/").get(async (req, res) => {
    const sql = "SELECT * FROM warehouses";
    try {
        const [results] = await connection.query(sql);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Occured on server");
    }
})

router.route("/:id")
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
            res.status(500).send("Error occured on the server");
        }
    })

    .delete(async (req, res) => {
        const warehouseId = req.params.id;

        try {
            const [result] = await connection.query(
                "DELETE FROM warehouses WHERE id = ?",
                [warehouseId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: `Warehouse with ID ${warehouseId} not found`
                });
            }
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error occured on the server");
        }
    });

router.route("/:id/inventories").get(async (req, res) => {
    const { id } = req.params;
    try {
        const [warehouseExists] = await connection.query(
            "SELECT id FROM warehouses WHERE id = ?",
            [id]
        );
        if (warehouseExists.length === 0) {
            return res.status(404).json({
                message: `Warehouse with ID ${id} not found`
            });
        }
        const sql = `
            SELECT 
                id, 
                item_name, 
                category, 
                status, 
                quantity
            FROM inventories 
            WHERE warehouse_id = ?
        `;
        const [inventories] = await connection.query(sql, [id]);
        res.status(200).json(inventories);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred on the server");
    }
});

export default router;