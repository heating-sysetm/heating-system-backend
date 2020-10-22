var express = require('express');
var router = express.Router();
let homes =  require('../controllers/home-controller.js');

/* GET home page. */

router.get('/homes', homes.getAll);
router.post('/add-home',homes.addHome);
router.post('/homes/:home_id/edit-home',homes.editHome);

module.exports = router;
