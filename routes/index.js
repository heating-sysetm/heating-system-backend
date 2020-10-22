var express = require('express');
var router = express.Router();
let homes =  require('../controllers/home-controller.js');
let auth = require('../middleware/authentication.js');
/* GET home page. */

router.post('/login',auth.getToken)
router.get('/homes',auth.ensureToken,homes.getAll);
router.post('/add-home',auth.ensureToken,homes.addHome);
router.put('/homes/:home_id/edit-home',auth.ensureToken,homes.editHome);
router.delete('/homes/:home_id/delete-home',auth.ensureToken,homes.deleteHome);

module.exports = router;
