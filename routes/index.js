var express = require('express');
var router = express.Router();
let homes =  require('../controllers/home-controller.js');
/* GET home page. */
router.get('/homes', homes.getAll);
router.post('/add-home',homes.addHome)

module.exports = router;
