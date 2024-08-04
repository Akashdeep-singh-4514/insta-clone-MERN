const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const jwt_secret = process.env.JWT_SECRET
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

router.put("/follow", Logincheck, (req, res) => {
    USER.findByIdAndUpdate({ _id: req.body.userId }, {
        $push: { followers: req.user._id }
    }).then(respo => {
        // return res.json({ message: "success" })
    }).catch(err => { console.log(err) })
    USER.findByIdAndUpdate({ _id: req.user._id }, {
        $push: { following: req.body.userId }
    }).then(respo => {
        return res.json({ message: "success", result: respo })
    }).catch(err => { console.log(err) })
})
router.put("/unfollow", Logincheck, (req, res) => {
    USER.findByIdAndUpdate({ _id: req.body.userId }, {
        $pull: { followers: req.user._id }
    }).then(respo => {
        // return res.json({ message: "success" })
    }).catch(err => { console.log(err) })
    USER.findByIdAndUpdate({ _id: req.user._id }, {
        $pull: { following: req.body.userId }
    }).then(respo => {
        return res.json({ message: "success", result: respo })
    }).catch(err => { console.log(err) })
})
router.get("/ifyoufollowed/:userId", Logincheck, (req, res) => {
    USER.findById({ _id: req.params.userId }).select("-password").then(respo => {
        var following = false
        respo.followers.map(follower => {

            if (follower.toString() == req.user._id.toString()) {
                following = true
            }
        });
        res.json({ following: following })
    }).catch(err => console.log(err))
})
router.get("/followers/:userName", Logincheck, (req, res) => {
    // let limit = req.query.limit
    USER.findOne({ userName: req.params.userName }).select("-password -email -__v -name -pfp -following").populate("followers", "pfp userName name").then(respo => { return res.json(respo) }).catch(err => { console.log(err); })
})
router.get("/following/:userName", Logincheck, (req, res) => {
    // let limit = req.query.limit
    USER.findOne({ userName: req.params.userName }).select("-password -email -__v -name -pfp -followers").populate("following", " _id name pfp userName").then(respo => { return res.json(respo) }).catch(err => { console.log(err); })
})

module.exports = router
