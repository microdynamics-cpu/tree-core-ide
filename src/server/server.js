const http = require("http");
const app = require("./app");
const port = "8081";

app.set("port", port);
http.createServer(app).listen(port);

console.log("server start to listen at localhost: " + port);
