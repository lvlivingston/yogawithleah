const express = require('express');
const router = express.Router();
const subscribersCtrl = require('../../controllers/api/subscriber');

// All paths start with '/api/subscribe'

// POST /api/subscribe (create a subscriber - newsletter signup)
router.post('/', subscribersCtrl.create);

module.exports = router;