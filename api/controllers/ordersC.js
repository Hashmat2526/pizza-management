const mongoose = require('mongoose');
const Order = require('../models/orderM');

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .exec()
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'product not found' })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                size: req.body.size,
                productId: req.body.productId
            })
            order.save()
                .then(result => {
                    res.status(200).json({ message: 'order is saved' })
                })
                .catch(err => {
                    res.status(500).json({ error: err })
                })
        })
        .catch()
}
exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id status')
        .populate('product', '_id flavor price')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        status: doc.status,
                        request: {
                            type: 'GET',
                            url: "http://localhost:4000/orders/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.orders_get_single_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('product quantity _id status')
        .populate('product', '_id flavor price')
        .exec()
        .then(docs => {
            res.status(200).json({
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        status: doc.status,
                        request: {
                            type: 'GET',
                            url: "http://localhost:4000/orders/"
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}
exports.orders_update_order = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Order.update({ id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({ result })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}
exports.orders_delete_order = (req, res, next) => {
    Order.remove(req.params.orderId)
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:4000/orders",
                    body: { productId: 'ID', quantity: 'Number' }
                }
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
}