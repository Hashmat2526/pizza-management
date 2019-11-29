const mongoose = require('mongoose');
const Product = require('../models/productM');

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        price: req.body.price,
        flavor: req.body.flavor,
        productImage: 'pizza image'
    });
    product
        .save()
        .then(product => {
            console.log('product created')
            res.status(200).json({
                message: 'product created successfully'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
};
exports.products_get_all = (req, res, next) => {
    Product
        .find({})
        .select('_id price flavor productImage created_at updated_at')
        .exec()
        .then(products => {
            const response = {
                total: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        price: product.price,
                        flavor: product.flavor,
                        productImage: product.productImage,
                        created_at: product.created_at,
                        updated_at: product.updated_at
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
};
exports.products_get_single_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('_id price flavor productImage created_at updated_at')
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json(product)
            } else {
                res.status(404).json({ message: 'No Valid entry found for provided ID' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};
exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};
exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'product deleted',
                result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};