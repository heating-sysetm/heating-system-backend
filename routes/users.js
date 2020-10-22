var express = require('express');
var router = express.Router();
let user =  require('../controllers/user-controller.js');
let auth = require('../middleware/authentication.js');

router.get('/',auth.ensureToken,user.getUsers);
router.post('/add-user',auth.ensureToken,user.addUser);
router.put('/:user_id/edit-user',auth.ensureToken,user.editUser);
router.delete('/:user_id/delete-user',auth.ensureToken,user.deleteUser);

module.exports = router;