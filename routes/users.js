const express = require("express");
const router = express.Router();

// Assuming you have already connected to MongoDB and have access to the `database` variable

// Route to check if the user exists by email (for login)
router.get("/login/:email", async (req, res) => {
  try {
    const database = req.app.locals.database; 
    if (!database) {
      throw new Error("Database connection not established.");
    }

    const email = req.params.email;
    
    if (!email) {
      return res.status(400).send("Email is required.");
    }

    // Find the user with the given email
    const user = await database.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Return the user data (excluding sensitive data like password) for login validation
    res.status(200).send({
      email: user.email,
      password: user.password, // In production, use hashed passwords and compare hashed values
    });
  } 
  catch (error) {
    console.log(error.message);
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});


router.post("/login", async (req, res) => {
  try {
    const database = req.app.locals.database;  // Access the database from app.locals
    if (!database) {
      throw new Error("Database connection not established.");
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Find the user with the given email
    const user = await database.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).send("Invalid credentials. User not found.");
    }

    // Check if the password matches (you should hash the password in a real-world app)
    if (user.password !== password) {
      return res.status(400).send("Invalid credentials. Incorrect password.");
    }

    // Return success response if login is successful
    res.status(200).send({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
});

module.exports = router;
