import { ObjectId } from "bson";

let quizCollection;
class QuizDOA {
  static async injectDB(client) {
    if (quizCollection) {
      return quizCollection;
    }
    try {
      const db = await client.db(process.env.KWIZ_DB_NAME);
      quizCollection = await db.collection("quizzes");
      this.quizzCollection = quizCollection;
      return quizCollection;
    } catch (err) {
      console.error(
        `Unable to establish a collection handle in quizDAO: ${err}`
      );
    }
  }

  static async getQuizzes() {
    let cursor;
    try {
      cursor = quizCollection.find();
    } catch (err) {
      console.error("Could not find quizzes", err);
      return [];
    }
    return cursor.toArray();
  }

  static async addQuiz(quiz) {
    try {
      const { title, tags = [], version = "v1" } = quiz;
      return await quizCollection.insertOne({
        title,
        tags,
        createdOn: new Date(),
        version
      });
    } catch (err) {
      console.error("Could not create quizz", err);
      return { error: err };
    }
  }

  static async deleteQuiz(quizId) {
    try {
      return await quizCollection.deleteOne({ _id: ObjectId(quizId) });
    } catch (err) {
      console.error("Could not delete quiz", err);
      return { error: err };
    }
  }

  static async updateQuiz(quizId, quiz) {
    const { title, tags = [], version = "v1" } = quiz;
    try {
      return await quizCollection.findOneAndUpdate(
        { _id: ObjectId(quizId) },
        { $set: { title, tags, updatedOn: new Date() } }
      );
    } catch (err) {
      console.error("Could not delete quiz", err);
      return { error: err };
    }
  }
}

export default QuizDOA;
