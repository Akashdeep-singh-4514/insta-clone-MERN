const express = require("express")
const app = express()
PORT = 5000

app.get("/", (req, res) => {
    res.json("good afternoon")
})

app.listen(PORT, () => {
    console.log("server at " + PORT);
})