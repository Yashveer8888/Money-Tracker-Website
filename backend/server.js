const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
// Initialize app
const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', require('./routes/transactions'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
