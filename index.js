const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/packages', require('./routes/Packages'));
app.use('/bookings', require('./routes/booking'));
app.use('/admin', require('./routes/admin'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
