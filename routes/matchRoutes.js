import express from "express";
import db from "../utils/mysql.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query = `
            SELECT 
                m.match_id,
                m.compatibility_score,
                m.is_compatible,
                m.relationship_longevity_months,
                u1.name AS partner_a_name,
                u2.name AS partner_b_name
            FROM matches m
            JOIN users u1 ON m.user_a_id = u1.user_id
            JOIN users u2 ON m.user_b_id = u2.user_id
        `;
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM matches WHERE match_id = ?", [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;