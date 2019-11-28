const express = require('express')
const router = express();

const UsersController = require('../controllers/usersC');

const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/check-role');


router.get('/', checkAuth, checkRole, UsersController.users_get_all_users);
router.get('/:userId', checkAuth, checkRole, UsersController.users_with_certain_orders);
router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);
router.delete('/:userId', checkAuth, checkRole, UsersController.users_delete_user);

module.exports = router;