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
    }).then(respo => { res.json({ message: "success updated" }) }).catch(err => {
        console.log(err);
        res.json({ error: "error occured" })
    })
})
router.put("/removepfp", Logincheck, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },

    }, {
        new: true
    }).then(respo => { res.json({ message: "success updated " }) }).catch(err => {
        console.log(err);
        res.json({ error: "error occured" })
    })
})
router.get("/search/:text", Logincheck, (req, res) => {
    USER.find().limit(20).select("-password -email -followers -following -__v").then(respo => {
        var result = []
        respo.map(client => {
            if (client.userName.toString().includes(req.params.text) || client.name.toString().includes(req.params.text)) {
                result = [...result, client]
            }
        })

        res.json(result)
    }).catch(err => { console.log(err) })
})
router.get("/getuser", Logincheck, (req, res) => {
    USER.findOne({ _id: req.user._id }).select("-password").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
module.exports = router