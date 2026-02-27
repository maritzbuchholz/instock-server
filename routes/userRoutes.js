import express from "express";
import db from "../utils/mysql.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { 
            name, 
            age, 
            education, 
            location, 
            career_field, 
            career_ambition, 
            openness, 
            extraversion, 
            agreeableness, 
            conscientiousness, 
            chronotype, 
            spontaneity, 
            love_language, 
            emotional_expressiveness 
        } = req.body;

        const query = `
            INSERT INTO users (
                name, 
                age, 
                education, 
                location, 
                career_field, 
                career_ambition, 
                openness, 
                extraversion, 
                agreeableness, 
                conscientiousness, 
                chronotype, 
                spontaneity, 
                love_language, 
                emotional_expressiveness
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name, 
            age, 
            education, 
            location, 
            career_field, 
            career_ambition, 
            openness, 
            extraversion, 
            agreeableness, 
            conscientiousness, 
            chronotype, 
            spontaneity, 
            love_language, 
            emotional_expressiveness
        ];

        const [result] = await db.query(query, values);
        
        res.status(201).json({ 
            message: "User profile created.", 
            affectedRows: result.affectedRows 
        });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;