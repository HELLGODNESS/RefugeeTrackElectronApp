const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');
const upload = require('../utils/upload');
router.get('/', personController.getAllPersons);
router.post('/', upload.array("SelectedImages", 1), personController.createPerson);
// Add other routes as needed

module.exports = router;
