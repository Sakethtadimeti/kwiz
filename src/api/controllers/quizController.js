import QuizDOA from "../../dao/quizDOA";

class QuizController {
  static async getQuizzes(req, res, next) {
    try {
      const quizzes = await QuizDOA.getQuizzes();
      let response = {
        data: quizzes
      };
      res.json(response);
    } catch (e) {
      console.log(`Error, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async addQuiz(req, res, next) {
    try {
      const { title, tags, version } = req.body;
      const quiz = {
        title,
        tags,
        version
      };
      const response = await QuizDOA.addQuiz(quiz);
      res.json(response);
    } catch (e) {
      console.log(`Error, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async deleteQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const response = await QuizDOA.deleteQuiz(quizId);
      const { deletedCount } = response;
      res.json({ deletedCount });
    } catch (e) {
      console.log(`Error, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async updateQuiz(req, res, next) {
    try {
      const quizId = req.params.id;
      const quiz = req.body;
      const response = await QuizDOA.updateQuiz(quizId, quiz);
      res.json(response);
    } catch (e) {
      console.log(`Error, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}

export default QuizController;
