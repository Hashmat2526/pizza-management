const express = require('express')
const router = express();

const OrdersController = require('../controllers/ordersC')


const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/check-role');



router.get('/search/', checkAuth, checkRole, OrdersController.orders_search_order);
router.get('/getcertainorders', checkAuth, checkRole, OrdersController.orders_get_certain_orders)
router.get('/:orderId', checkAuth, checkRole, OrdersController.orders_get_single_order);
router.patch('/:orderId', checkAuth, checkRole, OrdersController.orders_update_order);
router.delete('/:orderId', checkAuth, checkRole, OrdersController.orders_delete_order);
router.get('/', checkAuth, checkRole, OrdersController.orders_get_all);
router.post('/', checkAuth, OrdersController.orders_create_order);




module.exports = router;