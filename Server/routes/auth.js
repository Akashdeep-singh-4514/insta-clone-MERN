const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const USER = mongoose.model("USER")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const verification = require("../middleware/requireLogin.js")

router.get("/", verification, (req, res) => {
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
                const token = jwt.sign({ _id: savedUser._id }, jwt_secret)
                return res.status(200).json({ message: "signed in successfully", token: token })
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