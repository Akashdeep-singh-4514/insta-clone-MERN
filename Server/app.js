const express = require("express")
const app = express()
port = 5000
const mongoose = require("mongoose")
const { mongoUrl } = require("./keys.js")
const cors = require("cors")
app.use(cors("http://localhost:5173/"))
require("./models/model.js")
app.use(express.json())
app.use(require("./routes/auth.js"))


mongoose.connect(mongoUrl)

mongoose.connection.on("connected", () => {
    console.log("successfully connected");
})
mongoose.connection.on("error", () => {
    console.log("not connected to mongodb");
})

app.listen(port, () => {
    console.log("server at " + port);
})