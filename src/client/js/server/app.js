const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectHistoryApi = require("connect-history-api-fallback");

const express = require("express");
const session = require("express-session");
// const SessionFileStore = require("session-file-store")(session);

const controllers = require("./controllers");

let app = express();

// app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(connectHistoryApi());
// app.use(session({
//     // 用作服务器端生成session的签名
//     // Used as the signature of the server-side generated session
//     secret: "tree-core-ide",
//     // 强制保存session即使它并没有变化，默认为true
//     // Force the session to be saved, even if it has not changed.
//     // The default value is true
//     resave: false,
//     // 强制将未初始化的session存储，默认为true
//     // Force uninitialized sessions to be stored. The default value is true
//     saveUninitialized: false,
//     // 把session保存到文件中
//     // Save the session to a file
//     store: new SessionFileStore(),
// }));
// app.use(express.static(path.join(__dirname, "static")));
app.use("/", controllers);

module.exports = app;
