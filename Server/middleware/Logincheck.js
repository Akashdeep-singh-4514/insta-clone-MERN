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
        const { _id } = payload
        USER.findById(_id).then((userData) => {
            req.user = userData
            next()
        })
    })

}