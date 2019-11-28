const express = require('express')
const router = express();

const OrdersController = require('../controllers/ordersC')

const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/check-role');

router.get('/', checkAuth, checkRole, OrdersController.orders_get_all);
router.get('/:orderId', checkAuth, checkRole, OrdersController.orders_get_single_order);
router.post('/', checkAuth, checkRole, OrdersController.orders_create_order);
router.patch('/:orderId', checkAuth, checkRole, OrdersController.orders_update_order);
router.delete('/:orderId', checkAuth, checkRole, OrdersController.orders_delete_order);

module.exports = router;