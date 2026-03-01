import express from "express";
import { v4 as uuidv4 } from "uuid";
import db from "../mysql.js";
import { calculateCompatibility } from "../utils/algorithms.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            name, age, location, gender, sexual_orientation, education,
            career_field, career_ambition, openness, extraversion,
            agreeableness, conscientiousness, chronotype, spontaneity,
            love_language, emotional_expressiveness
        } = req.body;

        const userId = uuidv4();

        await db.query(
            `INSERT INTO users (
                user_id, name, age, location, gender, sexual_orientation, education,
                career_field, career_ambition, openness, extraversion,
                agreeableness, conscientiousness, chronotype, spontaneity,
                love_language, emotional_expressiveness
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId, name || "New User", age || 25, location || "City", gender || "Non-binary", 
                sexual_orientation || "Bisexual", education || 3, career_field || "Tech", 
                career_ambition || 0.5, openness || 0.5, extraversion || 0.5,
                agreeableness || 0.5, conscientiousness || 0.5, chronotype || "Early Bird", 
                spontaneity || 5, love_language || "Quality Time", emotional_expressiveness || 5
            ]
        );

        const [allUsers] = await db.query("SELECT * FROM users WHERE user_id != ?", [userId]);
        const newUser = {
            user_id: userId, gender, sexual_orientation,
            openness, extraversion, agreeableness, conscientiousness, career_ambition,
            chronotype, love_language
        };

        const matches = [];
        for (const existingUser of allUsers) {
            const score = calculateCompatibility(newUser, existingUser);
            if (score > 40) {
                matches.push({
                    userId: existingUser.user_id,
                    score,
                    isCompatible: score > 70 ? 1 : 0,
                    longevity: Math.floor(score * 1.5)
                });
            }
        }

        matches.sort((a, b) => b.score - a.score);
        const topMatches = matches.slice(0, 3);

        for (const m of topMatches) {
            await db.query(
                `INSERT INTO matches (match_id, user_a_id, user_b_id, compatibility_score, is_compatible, relationship_longevity_months)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [uuidv4(), userId, m.userId, m.score, m.isCompatible, m.longevity]
            );
        }

        res.status(201).json({ user_id: userId, message: "Quiz submitted and matches generated!" });
    } catch (err) {
        console.error("Quiz submission error:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
