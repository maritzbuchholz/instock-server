import express from "express";
import connection from "../utils/mysql.js";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.route("/").get(async (req,res)=>{
    try {
        const sql = `
        SELECT DISTINCT category
        FROM inventories
        ORDER BY category ASC
        `;

        const [results] = await connection.query(sql);  

        const categories = results.map((row)=> row.category);

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error fetching categories"});
    }
}); 

export default router;