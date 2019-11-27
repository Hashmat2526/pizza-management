const express = require('express')
const router = express();

const OrdersController = require('../controllers/ordersC')

router.get('/', OrdersController.orders_get_all);
router.get('/:orderId', OrdersController.orders_get_single_order);
router.post('/', OrdersController.orders_create_order);
router.patch('/:orderId', OrdersController.orders_update_order);
router.delete('/:orderId', OrdersController.orders_delete_order);

module.exports = router;