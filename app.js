const express = require("express");
const db = require("./config/db");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const authRouter = require("./routes/authRoutes");
const quizController = require("./controllers/quizController");
const questionController = require("./controllers/questionController");
const authController = require("./controllers/authController");

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

//Middleware
app.use((req,res,next)=>{
    req.user={
        id:"507f1f77bcf86cd799439011"
    }
    next()
})

// Routers

app.post("/api/newquiz", quizController.newQuiz);
app.get("/api/getQuizzes", quizController.getQuizzes);
app.get("/api/getquiz/:id", quizController.getQuiz);
app.put("/api/updatequiz", quizController.updateQuiz);
app.delete("/api/deletequiz/:id", quizController.deleteQuiz);

app.post("/api/newquestion", questionController.addQuestion);
app.get("/api/getquestions/:id", questionController.getQuestions);
app.get("/api/getquestion/:id", questionController.getQuestion);
app.put("/api/updatequestion", questionController.updateQuestion);
app.delete("/api/deletequestion/:id", questionController.deleteQuestion);

// app.post("/api/user",userController.createUser)

app.post("/auth/login",authController.login);
app.post("/auth/register",authController.register);
app.post("/auth/refresh",authController.refreshToken);



// Error handler
app.use(globalErrorHandler);

module.exports = app;
