var express = require('express');
var router = express.Router();
let homes =  require('../controllers/home-controller.js');
let auth = require('../middleware/authentication.js');

router.get('/',auth.ensureToken,homes.getAll);
router.post('/add-home',auth.ensureToken,homes.addHome);
router.put('/:home_id/edit-home',auth.ensureToken,homes.editHome);
router.delete('/:home_id/delete-home',auth.ensureToken,homes.deleteHome);

module.exports = router;