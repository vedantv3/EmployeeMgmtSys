require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db'); // ✅ no destructuring
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
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employeeDB';

const startServer = async () => {
  try {
    await connectDB(MONGO_URI);
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    process.exit(1);
  }
};

startServer();

module.exports = app; // for tests
