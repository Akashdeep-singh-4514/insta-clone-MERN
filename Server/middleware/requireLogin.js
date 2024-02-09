const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const USER = mongoose.model("USER")
const loggedin = false
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "not logged in 1" })

    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "not logged in 2" })
        }
        const { _id } = payload
        USER.findById(_id).then((userData) => {

        })
    })
    next()
}