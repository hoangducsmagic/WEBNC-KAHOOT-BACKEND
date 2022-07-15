const express = require("express");
const  db  = require("./config/db");
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const authRouter = require('./routes/authRoutes');


// Start express app
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Connect to db
db.connect();

// Routers
app.use('/',authRouter);


app.get("/api/getQuizzes", quizCtrl.getQuizzes);
app.get("/api/getquiz/:id", quizCtrl.getQuiz);
app.put("/api/updatequiz", quizCtrl.updateQuiz);
app.post("/api/newquiz", quizCtrl.newQuiz);
app.delete("/api/deletequiz/:id", quizCtrl.deleteQuiz);


app.get("/api/getquestion/:id", quizCtrl.getQuestion);
app.get("/api/getquestions/:id", quizCtrl.getQuestions);
app.put("/api/updatequestion", quizCtrl.updateQuestion);
app.delete("/api/deletequestion/:id", quizCtrl.deleteQuestion);
app.post("/api/newquestion", quizCtrl.addQuestion);





// Error handler
app.use(globalErrorHandler);

module.exports = app;
