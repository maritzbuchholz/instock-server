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
        res.status(500).send("Error occured on the server");
    }
})

router.post("/", async(req, res) => {

    const {
        warehouse_id,
        item_name,
        description,
        category,
        status,
        quantity
    } = req.body;
    // validation: required fields
    if (
        warehouse_id === undefined ||
        !item_name || !description || !category || !status || quantity === undefined
    ) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    // validation: quantity is a number (even though I have the validation on the UI)
    if (isNaN(quantity)) {
        return res.status(400).json({
            message: "Quantity is invalid."
        });
    }

    try {

        const [warehouse] = await connection.query(
            "SELECT id FROM warehouses WHERE id = ?",
            [warehouse_id]
        );

        if (warehouse.length === 0) {
            return res.status(400).json({
                message: "Invalid - warehouse does not exist."
            });
        }

        const insertSql = 
        `INSERT INTO inventories (
        warehouse_id, item_name, description, category, status, quantity)
        VALUES (?, ?, ?, ?, ?, ?)`; // used 'parameterized query' instead 

        const [result] = await connection.query(insertSql, [
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity
        ]);

        res.status(201).json({
            id: result.insertId, // the auto generatd incremented id
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred on the server");
    }


    });


router.route("/:id")
    .get(async (req, res) => {
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
            res.status(500).send("Error occured on the server");
        }
    })

    .delete(async (req, res) => {
        const inventoryId = req.params.id;

        try {
            const [result] = await connection.query(
                "DELETE FROM inventories WHERE id = ?",
                [inventoryId]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: `Inventory item with ID ${inventoryId} not found`
                });
            }
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error occurred on the server");
        }
    });

export default router;