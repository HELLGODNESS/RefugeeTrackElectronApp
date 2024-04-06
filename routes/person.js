const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');
router.get('/', personController.getAllPersons);
router.post('/', personController.createPerson);
// Add other routes as needed

module.exports = router;
