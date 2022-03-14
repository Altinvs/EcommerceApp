const Post = require("../models/posts")
const fs = require("fs")
const User = require('../models/User');

module.exports = class API {
    // fetch all posts
    static async fetchAllPost(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    // fetch fetch post by ID
    static async fetchPostByID(req, res){
        const id = req.params.id
        try {
            const post = await Post.findById(id);
            res.status(200).json(post)
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }
    // create a post
    static async createPost(req, res){
        const post = req.body;
        const imageName = req.file.filename;
        post.image = imageName;
        try {
            await Post.create(post);
            res.status(201).json({message: 'Post created successfullly'})
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
    // Update a post
    static async updatePost(req, res){
        const id = req.params.id
        let new_image = ''
        if(req.file){
            new_image = req.file.filename
            try {
                fs.unlinkSync('./uploads/'+req.body.old_image)
            } catch (err) {
                console.log(err)
            }
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost)
            res.status(200).json({ message: 'Post updated sucessfully' })
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    // Delete a post
    static async deletePost(req, res){
        const id = req.params.id
        try {
            const result = await Post.findByIdAndDelete(id)
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/'+result.image)
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: 'Post deleted sucessfully!'})
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    static async fetchAllUser(req, res){
        try{
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
                res.status(404).json({ message: err.message});
        }
    }

}