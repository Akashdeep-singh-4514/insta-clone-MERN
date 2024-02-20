const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")


router.get("/user/:userId", Logincheck, (req, res) => {
    USER.findById({ _id: req.params.userId }).select("-password").then(respo => { return res.status(200).json(respo) }).catch(err => { return res.status(404).json({ error: "user not found" }) })
})

module.exports = router