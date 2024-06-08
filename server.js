const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Veritabanına bağlan
connectDB();

// Body parser middleware
app.use(bodyParser.json());

// Rotalar
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use(express.static(path.join(__dirname, 'views')));
app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'resetPasswordForm.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
