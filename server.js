const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());  // For parsing JSON request bodies

const uri = "mongodb+srv://admin:admin123456@capstonecluster.ymc3w.mongodb.net/?retryWrites=true&w=majority&appName=CapstoneCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const DATABASENAME = "capstonedb";

// Function to run MongoDB connection
async function connectMongoDB() {
  try {
    await client.connect();
    const database = client.db(DATABASENAME);
    console.log("Successfully connected to MongoDB!");
    app.locals.database = database;  // Store the database connection in app.locals
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);  // Exit the process if MongoDB connection fails
  }
}

// Start the Express server and connect to MongoDB
app.listen(4000, () => {
  console.log("Server is running on port 4000");
  connectMongoDB().catch(console.error);
});

// Routes
app.use("/api/users", require("./routes/users"));
