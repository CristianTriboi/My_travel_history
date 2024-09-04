const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/create', verifyToken, travelController.createEntry);
router.get('/', verifyToken, travelController.getEntries);
router.put('/update', verifyToken, travelController.updateEntry);
router.delete('/delete', verifyToken, travelController.deleteEntry);

module.exports = router;