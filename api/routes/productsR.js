const express = require('express')
const router = express();
const checkAuth = require('../middleware/check-auth');
const checkRole = require('../middleware/check-role');

const ProductsController = require('../controllers/productsC')


router.get('/', checkAuth, ProductsController.products_get_all);
router.get('/:productId', checkAuth, ProductsController.products_get_single_product);
router.post('/', checkAuth, checkRole, ProductsController.products_create_product);
router.patch('/:productId', checkAuth, checkRole, ProductsController.products_update_product);
router.delete('/:productId', checkAuth, checkRole, ProductsController.products_delete_product);

module.exports = router;