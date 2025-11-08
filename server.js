require("dotenv").config(); // Load env variables first

const express = require('express'); //return express main function
const cors = require('cors');
const app = express(); //returns object of express app
const port = 3000;
// const port = process.env.PORT || 3000;

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); //json to js object

// Test API route
app.get("/", (req, res) => {
  res.json({ message: "MediNest Backend is running" });
});

// Healthcare Routes
const healthcareRoutes = require('./src/routes/healthcareRoutes/index');
app.use("/api/healthcare", healthcareRoutes);

// Global Error Handler (optional but good practice)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`MediNest Backend running on port ${port}`);
});
