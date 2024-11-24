/*****************************************************
                    EXPRESS.JS 
# npm init -y 
# npm i express dotenv
# npm i mongoose             
/****************************************************/
const cookieParser = require("cookie-parser");
const connectDB = require("./src/configs/db");
const express = require("express");
const app = express();

/****************************************************/

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/****************************************************/
// DB Connection
connectDB();

/****************************************************/
// Middlewares:

app.use(express.json());
app.use(cookieParser());

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/****************************************************/
// Routes

app.use("/", require("./src/routes/index"));

app.all("*", (req, res, next) => {
  throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
});

/****************************************************/

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

/****************************************************/

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
