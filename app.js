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

// Error handler
app.use(globalErrorHandler);

module.exports = app;
