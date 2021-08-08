const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectHistoryApi = require("connect-history-api-fallback");

const express = require("express");
const expressSession = require("express-session");
const sessionFileStore = require("session-file-store")(expressSession);

const controller = require("./controllers");

let app = express();

app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(connectHistoryApi());
app.use(expressSession({
    store: new sessionFileStore(),
    secret: "test",
    resave: false,
    saveUninitialized: false
}));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/", controller);

module.exports = app;
