const express = require("express")
// require is used to import modules
const app = express()
PORT = 5000
// fixing cross origin
const cors = require("cors")
app.use(cors("http://localhost:5173/signin"))

const data = require("./data.js")

app.get("/", (req, res) => {
    res.json(data)
})

app.listen(PORT, () => {
    console.log("server at " + PORT);
})