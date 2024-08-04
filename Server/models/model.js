const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    followers: [{
        type: ObjectId,
        ref: "USER"

    }],
    following: [{
        type: ObjectId,
        ref: "USER"

    }],
    pfp: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
mongoose.model("USER", userSchema)