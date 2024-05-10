const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Add mongoose for MongoDB

require('dotenv').config()

const app = express();

// MongoDB connection
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas / Compass");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas / Compass:", error);
  }
}

connectToDB(); // Call the function to connect to MongoDB

app.use(
  cors({
    origin: true,
    methods: "GET,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

require("./startup/routes")(app);

const port = process.env.PORT || 8080; // Use the PORT environment variable if available
app.listen(port, () => console.log(`Server is running on port ${port}`));
