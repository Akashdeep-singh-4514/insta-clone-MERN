const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys.js")
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

router.post("/createpost", Logincheck, (req, res) => {
    const { image, content } = req.body
    const userId = req.user
    // console.log(userId);
    if (!userId || !image || !content) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    const post = new Post({
        userId, image, content
    })
    post.save().then(result => {
        return res.status(200).json({ message: "successfully posted" })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ error: "error occured" })
    })

})
router.get("/allposts", Logincheck, (req, res) => {
    Post.find().populate("userId", "_id userName pfp").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
router.get("/myposts", Logincheck, (req, res) => {
    Post.find({ userId: req.user._id }).populate("userId", "_id userName followers following").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
router.put("/likepost", Logincheck, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).then(respo => { res.json({ message: "success" }) }).catch(err => { console.log(err) })
})
router.put("/unlikepost", Logincheck, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).then(respo => { res.json({ message: "success" }) }).catch(err => { console.log(err) })
})
router.post("/ifliked", Logincheck, (req, res) => {
    Post.findById(req.body.postId).then(post => {
        if (post.likes) {
            // console.log(post.likes.indexOf(req.user._id));
            return res.json({ true: post.likes.indexOf(req.user._id) })
        } else {
            return res.json({ false: -1 })
        }

    })
})
router.put("/addcomment", Logincheck, (req, res) => {
    const comment = {
        comment: req.body.text,
        userId: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).then(respo => { res.json({ message: "success" }) }).catch(err => { console.log(err) })
})



module.exports = router