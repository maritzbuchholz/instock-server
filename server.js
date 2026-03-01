import "dotenv/config";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

const port = process.env.PORT;
const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/matches", matchRoutes);

app.listen(port, () => console.log(`Listening on ${port}`));