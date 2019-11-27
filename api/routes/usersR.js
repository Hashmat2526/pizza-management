const express = require('express')
const router = express();

const UsersController = require('../controllers/usersC')

router.get('/', UsersController.users_get_all_users);
router.get('/:userId', UsersController.users_with_certain_orders);
router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);
router.delete('/:userId', UsersController.users_delete_user);

module.exports = router;