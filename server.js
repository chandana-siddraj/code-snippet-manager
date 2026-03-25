const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const snippetRoutes = require('./routes/snippets');

const app = express();

// Middleware
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Code Snippet Manager API is running 🚀");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/snippets', snippetRoutes);

// Debug
console.log('Mongo URI:', process.env.MONGO_URI);

// Fail if env missing
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI is undefined!');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
