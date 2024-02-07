const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const USER = mongoose.model("USER")

router.get("/", (req, res) => {
    res.send("hello")
})

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body
    if (!name || !userName || !email || !password) {
        res.status(422).json({ error: "please fill all fields" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "username and email already exist" })
        }
        const user = new USER({
            name, userName, email, password
        })
        user.save()
            .then(user => { res.json({ message: "saved successfully" }) })
            .catch(err => { console.log(err); })
    })


})

module.exports = router