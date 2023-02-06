import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


// This allows us to pull environment variables from dotenv.
dotenv.config();

// Initialize express application.
const app = express();

// Add additional middleware to the app.
app.use(cors());
app.use(express.json({limit: '50mb'}));

// Add middleware for the post/dalle routes.
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


// Create our first route. This will just let us know that our server is running once we visit the URL of our server.
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E');
})

// Need a way to run the server.
// Run our app on 3275.
const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(3275, () => {
            console.log('Server has started on http://localhost:3275')
        })
    } catch(error) {
        console.log(error);
    }

}

startServer();