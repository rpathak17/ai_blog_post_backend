const mongoose = require('mongoose');
//pass: 
const connectDB = async() =>{
    try {
       const conn = await mongoose.connect('mongodb+srv://ritikpathak189:C2TfNMDLr8ar68iq@blog-post.0xn1rgu.mongodb.net/ai-blog-post?retryWrites=true&w=majority&appName=blog-post')
       console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB ${error.message}`)
        process.exit(1); 
    }
};

module.exports = connectDB;