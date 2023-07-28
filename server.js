// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const User = require('./models/user')
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());
app.use(bodyParser.json());
// Connect to MongoDB using async/await
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

app.post('/api/users', async (req, res) => {
  console.log(req.body);
  try {
    // Extract form data from the request body
    const { name,startdate, enddate,cottage,glamp,contact } = req.body;
    // Create a new User document using the Mongoose model
    const newUser = new User({  name,startdate, enddate,cottage,glamp,contact });
    // Save the new User document to the MongoDB database
    await newUser.save();
    console.log("User Created");
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import routes and use them in your app
// const userRoutes = require('../routes/users');
// app.use('/api', userRoutes); // For example, if you want your user routes to be under /api

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
