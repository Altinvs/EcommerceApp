const Post = require("../models/posts")

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
        res.send('Fetch post by id')
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
        res.send('Update post')
    }
    // Delete a post
    static async deletePost(req, res){
        res.send('Delete post')
    }
}