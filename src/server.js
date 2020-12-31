import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import QuizRouter from "./api/routes/quizRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/quizzes", QuizRouter);

export default app;
