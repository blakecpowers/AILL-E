import mongoose from 'mongoose';


const connectDB = (url) => {
    // Accepts a URL and call mongoose with strict query to true - useful with search functionality later on.
    // mongoose.set('strictQuery'. true);

    // Connect our database (important!!)
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
}


export default connectDB