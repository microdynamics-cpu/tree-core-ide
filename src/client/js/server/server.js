const http = require("http");
const app = require("./app");
const port = "8082";

app.set("port", port);

const server = http.createServer(app);
server.listen(port);

console.log("server start to listen at localhost: " + port);
