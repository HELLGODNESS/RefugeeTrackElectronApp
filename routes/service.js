const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
router.get('/', serviceController.getAllServices);
router.get('/count', serviceController.getServicesCount);
router.get('/stats', serviceController.getStats);
router.get('/barchart', serviceController.getBarchart);
router.post('/', serviceController.giveService);
router.get('/export', serviceController.exportData);
router.delete('/', serviceController.deleteService);

module.exports = router;
