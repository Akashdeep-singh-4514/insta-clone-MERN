const { log } = require("console");
const http = require("http")

const server = http.createServer((req, res) => {
    console.log("server created");
    res.end("hello ")
})

server.listen(5000, "localhost", () => {
    console.log("server at 5000");
})