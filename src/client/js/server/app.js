const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectHistoryApi = require("connect-history-api-fallback");

const express = require("express");

const controllers = require("./controllers");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(connectHistoryApi());
app.use("/", controllers);

module.exports = app;
