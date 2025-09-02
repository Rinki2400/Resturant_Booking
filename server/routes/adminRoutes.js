const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controller/adminController');


// POST /api/admin/login
router.post('/adlogin',  adminLogin);

module.exports = router;