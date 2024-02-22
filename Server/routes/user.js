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
router.put("/changepfp", Logincheck, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { pfp: req.body.image }

    }, {
        new: true
    }).then(respo => { res.json({ message: "success updated,refresh to see change" }) }).catch(err => {
        console.log(err);
        res.json({ error: "error occured" })
    })
})
router.put("/removepfp", Logincheck, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },

    }, {
        new: true
    }).then(respo => { res.json({ message: "success updated ,refresh to see change" }) }).catch(err => {
        console.log(err);
        res.json({ error: "error occured" })
    })
})
module.exports = router