const mongoose = require("mongoose")
const USER = mongoose.model("USER")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.json({ loggedin: false, userData: null, error: "jwt token not provided" })

    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwt_secret, (err, payload) => {
        if (err) {
            return res.json({ loggedin: false, userData: null, error: "you are not logged in" })
        }
        // console.log(payload);
        const { _id } = payload
        USER.findOne({ _id: payload._id }).then((savedUser) => {
            req.user = { _id: savedUser._id, name: savedUser.name, userName: savedUser.userName, pfp: savedUser.pfp, following: savedUser.following, followers: savedUser.followers, email: savedUser.email }
            next()
        }).catch(err => res.status(500).json({ error: "error occures" }))
    })

}