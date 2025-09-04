require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db'); // updated db.js
const authRoutes = require('./src/routes/authRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB using db.js
    await connectDB();

    // Only start server if not in test mode
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () =>
        console.log(`🚀 Server running on port ${PORT}`)
      );
    }
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1); // Exit on DB failure
  }
};

startServer();

module.exports = app; // for testing
