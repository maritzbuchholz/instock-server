import express from "express";
import db from "../mysql.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
    try {
        const [matches] = await db.query(
            `SELECT m.compatibility_score, m.relationship_longevity_months, u.* 
             FROM matches m 
             JOIN users u ON m.user_b_id = u.user_id 
             WHERE m.user_a_id = ? 
             ORDER BY m.compatibility_score DESC LIMIT 3`, 
            [req.params.userId]
        );
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;