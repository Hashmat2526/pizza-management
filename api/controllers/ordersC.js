const mongoose = require('mongoose');
const Order = require('../models/orderM');
const Product = require('../models/productM')
const User = require('../models/userM')


exports.orders_create_order = async (req, res, next) => {
    try {
        // checking for the same user
        console.log(req.userData.userId, req.body.userId)
        if (req.userData.userId !== req.body.userId) {
            return res.status(401).json({
                message: " please create post with your own account "
            })
        }
        const product = await Product.findById(req.body.productId).select('-__v');
        const user = await User.findById(req.body.userId).select('-__v');
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: product._id,
            size: req.body.size,
            user: user._id
        })
        let result = await order.save();

        res.status(201).json({
            message: 'order saved',
            createdOrder: {
                _id: result._id,
                product: product,
                quantity: result.quantity,
                user
            },
            request: {
                type: 'GET',
                url: "http://localhost:4000/orders/" + order._id
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'order not saved'
        })
    }
}
exports.orders_get_all = (req, res, next) => {

    Order.find()
        .select('product quantity _id status size')
        .populate('product', '_id flavor price')
        .populate('user', '_id email')
        .exec()
        .then(docs => {
            console.log(`ok`)
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        user: doc.user,
                        quantity: doc.quantity,
                        status: doc.status,
                        size: doc.size,
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
        .select('product quantity _id status size')
        .populate('product', '_id flavor price')
        .populate('user', '_id email')
        .exec()
        .then(docs => {
            if (!docs) {
                return res.status(404).json({
                    message: 'order not found'
                })
            }
            res.status(200).json({
                orders: {
                    _id: docs._id,
                    product: docs.product,
                    user: docs.user,
                    quantity: docs.quantity,
                    status: docs.status,
                    size: docs.size,
                    request: {
                        type: 'GET',
                        url: "http://localhost:4000/orders/"
                    }
                }
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
    Order.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {

            console.log(updateOps);
            res.status(200).json({ result })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}
exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
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

exports.orders_search_order = (req, res, next) => {
    const { size, startDate, endDate } = req.query;

    const sd = new Date(new Date(startDate).setHours(00, 00, 00))
    const ed = new Date(new Date(endDate).setHours(00, 00, 00))

    console.log(sd, ed)
    Order.find({
        created_at: {
            $lte: ed,
            $gt: sd
        }, size: size.toUpperCase()
    })
        .select('-__v')
        .exec().then(orders => {
            console.log(orders);
            res.status(200).json({
                total: orders.length,
                orders: orders
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });



}

exports.orders_get_certain_orders = async (req, res, next) => {
    const usersObjArr = [];

    console.log(usersObjArr)
    const usersIds = await User.find().select('_id').exec();
    const userswithorders = await Order.find().select('user');

    for await (const userid of usersIds) {
        const { _id } = userid;
        var count = 0;
        console.log('users array ' + _id);
        console.log('*****************************')

        for (const orderuser of userswithorders) {
            // console.log("count before " + count)
            const user = orderuser.user;
            console.log('users array ' + _id);
            console.log('orders array ' + user);

            if (_id.toString() === user.toString()) {
                count++;
            }
            console.log("count after " + count);


        }
        usersObjArr.push({ _id, count });

    }
    console.log("final array");
    console.log(usersObjArr)
    let result = usersObjArr.filter(function (objarr) {

        return parseInt(objarr.count) > parseInt(req.query.num);
    })
    // console.log(result._id.toString())
    for (const res of result) {
        console.log(res._id)
    }
    res.status(200).send(
        result
    )

}