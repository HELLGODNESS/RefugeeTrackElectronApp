const express = require('express');
const router = express.Router();
const personController = require('../controllers/service');
router.get('/', personController.getAllServices);
router.get('/count', personController.getServicesCount);
router.get('/stats', personController.getStats);
router.post('/', personController.giveService);
router.delete('/', personController.deleteService);

module.exports = router;
