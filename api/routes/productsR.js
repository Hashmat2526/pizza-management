const express = require('express')
const router = express();
const checkAuth = require('../middleware/check-auth')

const ProductsController = require('../controllers/productsC')

router.get('/', checkAuth, ProductsController.products_get_all);
router.get('/:productId', checkAuth, ProductsController.products_get_single_product);
router.post('/', ProductsController.products_create_product);
router.patch('/:productId', ProductsController.products_update_product);
router.delete('/:productId', ProductsController.products_delete_product);

module.exports = router;