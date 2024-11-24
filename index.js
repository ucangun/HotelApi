/*****************************************************
                    EXPRESS.JS 
# npm init -y 
# npm i express dotenv
# npm i mongoose             
/****************************************************/

const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

/****************************************************/
// Middlewares:

app.use(express.json());

/****************************************************/
// Routes

app.all("*", (req, res, next) => {
  throw new Error(`Can't find ${req.originalUrl} on this server!`, 404);
});

/****************************************************/

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
