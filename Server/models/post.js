const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "USER"
    },
    image: {
        type: String,
        required: true,
        default: "no photo"
    },
    content: {
        type: String,
        required: true
    }
})
mongoose.model("Post", postSchema)