const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

router.put("/follow", Logincheck, (req, res) => {
    USER.findByIdAndUpdate({ _id: req.body.userId }, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }).then(respo => {
        res.json({ message: "success" })
    }).catch(err => { console.log(err) })
    USER.findByIdAndUpdate({ _id: req.user._id }, {
        $push: { following: req.body.userId }
    }, {
        new: true
    }).then(respo => {
        // res.json({ message: "success" })
    }).catch(err => { console.log(err) })
})


module.exports = router
