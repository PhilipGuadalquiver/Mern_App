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
      password: user.password, 
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
    const database = req.app.locals.database; // Access the database from app.locals
    if (!database) {
      throw new Error("Database connection not established.");
    }

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send("Name, email, and password are required.");
    }

    // Check if the email already exists in the `users` table
    const existingUser = await database.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    // Insert a new user into the `users` table
    const newUser = { name, email, password };
    const result = await database.collection("users").insertOne(newUser);

    // Return success response
    res.status(201).send({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user in MongoDB");
  }
});


module.exports = router;
