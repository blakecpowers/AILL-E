import mongoose from 'mongoose';

// Creating a new Schema for Post.
const Post = new mongoose.Schema({
    name: {type: String, required: true },
    prompt: {type: String, required: true },
    photo: {type: String, required: true }
})

// Create a model of that schema.
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;

