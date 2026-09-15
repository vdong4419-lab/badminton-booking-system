const express = require('express');
const router = express.Router();
const { getActivePromotions } = require('../controllers/promotionController');

// Khách vãng lai cũng có thể xem khuyến mãi nên không bắt buộc Token
router.get('/', getActivePromotions);

module.exports = router;