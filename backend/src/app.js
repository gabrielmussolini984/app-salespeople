 require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
const cors = require('cors')
const express = require('express')

const app = express();
app.use(cors('*'))
app.use(express.json());
app.use('', require("./routes/routes"));

module.exports = app
