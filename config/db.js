const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://Dimes:Alibaba228@cluster0.t6plzkn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
};
module.exports = connectDB;