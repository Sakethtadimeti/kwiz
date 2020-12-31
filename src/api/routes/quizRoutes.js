import { Router } from "express";
import QuizController from "../controllers/quizController";

const router = new Router();

router
  .route("/")
  .get(QuizController.getQuizzes)
  .post(QuizController.addQuiz);

router
  .route("/:id")
  .delete(QuizController.deleteQuiz)
  .put(QuizController.updateQuiz);

export default router;
