const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

router.get("/", Logincheck, (req, res) => {

    return res.json({ loggedin: true, userData: req.user })

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
                return res.status(200).json({ userData: { _id: savedUser._id, name: savedUser.name, userName: savedUser.userName, pfp: savedUser.pfp, following: savedUser.following, followers: savedUser.followers, email: savedUser.email }, message: "signed in successfully", token: token })
            }
            else {
                return res.status(422).json({ error: "Invalid password" })

            }
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ error: "error occures" })
        })
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
                .then(user => {
                    USER.findOne({ email: email }).then((savedUser) => {
                        if (!savedUser) {
                            return res.status(422).json({ error: "Error occured" })
                        }
                        const token = jwt.sign({ _id: savedUser._id }, jwt_secret)
                        return res.status(200).json({ userData: { _id: savedUser._id, name: savedUser.name, userName: savedUser.userName, pfp: savedUser.pfp, following: savedUser.following, followers: savedUser.followers, email: savedUser.email }, message: "signup in successfully", token: token })
                    })

                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({ error: "error occures" })
                })
        })

    })


})
// router.get("/getuser", Logincheck, (req, res) => {
//     USER.find({ _id: req.user._id }).then(respo => { res.json(respo[0]) }).catch(err => { console.log(err) })
// })

module.exports = router