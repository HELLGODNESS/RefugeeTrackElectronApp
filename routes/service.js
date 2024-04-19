const express = require('express');
const router = express.Router();
const personController = require('../controllers/service');
router.get('/', personController.getAllServices);
router.post('/', personController.giveService);
// Add other routes as needed

module.exports = router;
