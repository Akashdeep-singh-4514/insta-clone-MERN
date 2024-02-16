const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

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
router.get("/myposts", Logincheck, (req, res) => {
    Post.find({ userId: req.user._id }).populate("userId", "_id userName").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})




module.exports = router