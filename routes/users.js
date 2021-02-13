var express = require('express');
var router = express.Router();
let user =  require('../controllers/user-controller.js');
let auth = require('../middleware/authentication.js');
// auth.ensureToken
router.get('/',user.getUsers);
router.post('/add-user',user.addUser);
router.put('/:user_id/edit-user',user.editUser);
router.delete('/:user_id/delete-user',user.deleteUser);
router.get('/supervisors',user.getSupervisors);
module.exports = router;