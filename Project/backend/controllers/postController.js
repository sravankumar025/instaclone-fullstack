const mongoose = require("mongoose");
const { PostSchema } = require("../models/postModel.js")



const Post = mongoose.model('Post', PostSchema)

const createPost = async (req, res) => {

 const {postImage, author, location, description} = req.body;

 let finalDate = new Date() + "";
 finalDate = finalDate.split(" ");
 let newdate = finalDate[2] + " " + finalDate[1] + " " + finalDate[3];
 let likes = 0;
 let date=newdate;

 try {

    const post = await Post.create({ postImage,author , location, description, date, likes });
    res.status(201).json({ success: true, post, message: "Post Created Successfuly" })

} catch (error) {
    res.status(500).json({ success: false, error: error.message })
}
}


const getPost = async (req, res) => {
   
    try {
        const post = await Post.find().sort({createdAt:-1})
        res.status(201).json({ success: true, post, message: "Posts are Successfuly Fetched" })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}


module.exports = { createPost, getPost }
