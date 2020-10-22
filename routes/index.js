var express = require('express');
var router = express.Router();
let auth = require('../middleware/authentication.js');

/* GET home page. */
router.post('/login',auth.getToken)

module.exports = router;
