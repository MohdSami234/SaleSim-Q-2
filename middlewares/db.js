const mongoose = require('mongoose');
exports.dbconnection = ()=>{
    mongoose.connect("mongodb+srv://msami9503:jplq2KwSRPg8XvYi@cluster0.1zp7ceu.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  }); 
 
}