const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const jwt_secret = process.env.JWT_SECRET
const Logincheck = require("../middleware/Logincheck.js")
const Post = mongoose.model("Post")

router.post("/createpost", Logincheck, (req, res) => {
    const { image, content, date } = req.body
    const userId = req.user
    // console.log(userId);
    if (!userId || !image || !content || !date) {
        return res.status(422).json({ error: "please fill all fields" })
    }
    const post = new Post({
        userId, image, content, date
    })
    post.save().then(result => {
        return res.status(200).json({ message: "successfully posted" })
    }).catch(err => {
        console.log(err);
        return res.status(400).json({ error: "error occured" })
    })

})
router.get("/allposts", Logincheck, (req, res) => {
    let limit = req.query.limit
    Post.find().sort("-date").limit(parseInt(limit)).populate("userId", "_id userName ").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
})
router.get("/followedposts", Logincheck, (req, res) => {
    let limit = req.query.limit
    Post.find().sort("-date").limit(parseInt(limit)).populate("userId", "_id userName pfp followers").then(respo => {
        var result = []
        respo.forEach(element => {
            if (req.user._id.toString() == element.userId._id.toString()) {
                result = [...result, element]
            }

            for (let i = 0; i < element.userId.followers.length; i++) {
                // console.log(element.userId.followers[i].toString() == req.user._id.toString());
                if (element.userId.followers[i].toString() == req.user._id.toString()) {
                    result = [...result, element]
                }
            }

        })
        return res.json(result)
    }).catch(err => {
        console.log(err)
    })
})
router.get("/userposts/:userId", Logincheck, (req, res) => {
    let limit = req.query.limit

    Post.find({ userId: req.params.userId }).sort("-date").limit(parseInt(limit)).populate("userId", "_id userName ").then(respo => { res.json(respo) }).catch(err => { console.log(err) })
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

    }).catch(err => { console.log(err); })
})
router.put("/addcomment", Logincheck, (req, res) => {
    const comment = {
        comment: req.body.text,
        userId: req.user._id,
        userName: req.user.userName
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).then(respo => { res.json({ message: "success" }) }).catch(err => { console.log(err) })
})
router.post("/getpost", Logincheck, (req, res) => {
    Post.findById({ _id: req.body.postId }).populate("userId", "_id userName pfp ").then(post => {
        if (post.likes) {
            // console.log(post.likes.indexOf(req.user._id));
            return res.json({ liked: post.likes.indexOf(req.user._id) >= 0 ? true : false, post })
        }
    }).catch(err => { console.log(err); })
})

router.delete("/deletepost/:postId", Logincheck, (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.postId }).then(post => { res.json({ message: "deleted successfully" }) }).catch(err => console.log(err))


})



module.exports = router