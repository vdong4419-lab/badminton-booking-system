const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const promotionRoutes = require('./routes/promotionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Khai báo API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/promotions', promotionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});