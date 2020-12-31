import app from "./server";
import QuizDOA from "./dao/quizDOA";
import { MongoClient } from "mongodb";

(async function() {
  try {
    const client = await MongoClient.connect(process.env.KWIZ_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    await QuizDOA.injectDB(client);
    app.listen(8000, () => console.log("Listening on port 8000"));
  } catch (e) {
    console.error(`Could not connect to Mongo client ${e}`);
    process.exit(1);
  }
})();
