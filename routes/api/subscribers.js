const express = require('express');
const router = express.Router();
// const Subscriber = require('../../models/subscriber');
const { create } = require('../../controllers/api/subscribers');

// Handle POST request to /subscribers using the create function from the controller
router.post('/', create);

// // Handle POST request to /subscribers
// router.post('/', async (req, res) => {
//   try {
//     const { email } = req.body;
//     // Your logic to save the email to the database (e.g., MongoDB)
//     const subscriber = await Subscriber.create({ email });
//     res.status(201).json(subscriber); // Send a success response
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' }); // Send an error response
//   }
// });

module.exports = router;