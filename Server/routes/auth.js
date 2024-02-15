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
                return res.status(200).json({ userData: savedUser, message: "signed in successfully", token: token })
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
                        return res.status(200).json({ userData: savedUser, message: "signup in successfully", token: token })
                    })

                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({ error: "error occures" })
                })
        })

    })


})
router.post("/createpost", Logincheck, (req, res) => {
    const { image, content } = req.body
    const userId = req.user
    // console.log(userId);
    if (!userId || !image || !content) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    const post = new Post({
        userId, image, content
    })
    post.save().then(result => {
        return res.status(200).json({ message: "successfully posted" })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ error: "error occured" })
    })

})

router.get("/allposts", Logincheck, (req, res) => {
    Post.find().populate("userId", "_id userName").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
router.get("/myprofile", Logincheck, (req, res) => {
    Post.find({ userId: req.user._id }).populate("userId", "_id userName").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
router.get("/getuser", Logincheck, (req, res) => {
    USER.find({ _id: req.user._id }).then(respo => { res.json(respo[0]) }).catch(err => { console.log(err) })
})

module.exports = router