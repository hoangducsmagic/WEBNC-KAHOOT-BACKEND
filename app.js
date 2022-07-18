const express = require("express");
const db = require("./config/db");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const authRouter = require("./routes/authRoutes");
const questionRouter = require("./routes/questionRoutes");
const quizRouter = require("./routes/quizRoutes");
const auth=require('./middlewares/auth')

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


// Routers
app.use("/auth",authRouter)
app.use("/api",auth,questionRouter)
app.use("/api",auth,quizRouter)

// Error handler
app.use(globalErrorHandler);

module.exports = app;
