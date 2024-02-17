const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "USER"
    },
    likes: [{
        type: ObjectId,
        ref: "USER"

    }],
    comments: [{
        comment: { type: String },
        userId: { type: ObjectId, ref: "USER" }

    }],
    image: {
        type: String,
        required: true,
        default: "no photo"
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})
mongoose.model("Post", postSchema)