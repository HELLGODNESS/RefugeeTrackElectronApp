const express = require('express');
const router = express.Router();
const personController = require('../controllers/person');
const upload = require('../utils/upload');
router.get('/', personController.getAllPersons);
router.delete('/', personController.deletePerson);
router.post('/', upload.fields([{ name: 'SelectedImages', maxCount: 1 }, { name: 'Docs' }]), personController.createPerson);
// Add other routes as needed

module.exports = router;
