import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

// This is just going to display simple html on the page when we visit the root.
router.route('/').get((req, res) => {
    res.send('Hello From DALLE')
})

// Add post request handling to our server.
// Make it "async" because it will take some time to get the data back from DALL-E
router.route('/').post(async (req, res) => {
    try {
        // Prompt is coming from the request body.
       const { prompt } = req.body; 

       // Generate the image (get the AI Response).
       // Pass in the prompt, number of images, size of the image, and resonse format.
       const aiResponse = await openai.createImage({
        prompt,
        n : 1,
        size: '1024x1024',
        response_format: 'b64_json',
       });

       // Get the image from the resposne to OpenAI.
       const image = aiResponse.data.data[0].b64_json;

       // Send image back to the front end.
       res.status(200).json({ photo: image })
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.response.data.error.message);
    }
})

export default router;