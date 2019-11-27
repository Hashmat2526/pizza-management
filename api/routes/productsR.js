const express = require('express')
const router = express();

const ProductsController = require('../controllers/productsC')

router.get('/', ProductsController.products_get_all);
router.get('/:productId', ProductsController.products_get_single_product);
router.post('/', ProductsController.products_create_product);
router.patch('/:productId', ProductsController.products_update_product);
router.delete('/:productId', ProductsController.products_delete_product);

module.exports = router;