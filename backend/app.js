const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const khachHangRoutes = require('./routes/khach-hang-va-vang-lai');
const leTanRoutes = require('./routes/le-tan');
const adminRoutes = require('./routes/quan-tri-admin');

// Sử dụng Routes
app.use('/api/khach-hang', khachHangRoutes);
app.use('/api/le-tan', leTanRoutes);
app.use('/api/admin', adminRoutes);

app.listen(5000, () => {
  console.log('Backend đang chạy tại cổng 5000');
});