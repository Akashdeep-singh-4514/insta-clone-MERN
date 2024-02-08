const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const USER = mongoose.model("USER")
const bcrypt = require("bcrypt")

router.get("/", (req, res) => {
    res.send("hello")
})
router.post("/signin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Email doesnt exist" })
        }
        // res.send(savedUser)

        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                return res.status(200).json({ message: "signed in successfully" })
            }
            else {
                return res.status(422).json({ error: "Invalid password" })

            }
        }).catch(err => { console.log(err); })
    })


})
router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body
    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "username and email already exist" })
        }
        bcrypt.hash(password, 10).then((hashedPassword) => {
            const user = new USER({
                name, userName, email, password: hashedPassword
            })
            user.save()
                .then(user => { res.json({ message: "registered successfully" }) })
                .catch(err => { console.log(err); })
        })

    })


})

module.exports = router