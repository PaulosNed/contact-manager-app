const express = require('express');
const { getAllContacts, getContact, CreateContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateToken');

const router = express.Router();
router.use(validateToken);

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.post('/', CreateContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;