var express = require('express');
var router = express.Router();
let homes =  require('../controllers/home-controller.js');

/* GET home page. */

router.get('/homes', homes.getAll);
router.post('/add-home',homes.addHome);
router.put('/homes/:home_id/edit-home',homes.editHome);
router.delete('/homes/:home_id/delete-home',homes.deleteHome);

module.exports = router;
