import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// Get ALL Posts Route
router.route('/').get(async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success:true, data: posts})
    } catch (err) {
        res.status(500).json({success:false, message: err})
    }
})

// POST route
// Receives data from frontend, uploads the photo to cloudinary, stores entry in database using URL.
// This is better practice than storing the image as encoded base 64 when scaling.
router.route('/').post(async(req, res) => {
    try {
        // Get data from frontend
        const { name, prompt, photo } = req.body;

        // Upload photo URL to cloudinary
        const photoUrl = await cloudinary.uploader.upload(photo);

        // Create a new post in our Mongo Database - only sharing URL to post (not post itself)
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error})
    }
})


export default router;