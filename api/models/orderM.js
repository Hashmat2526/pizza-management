const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    size: {
        type: String,
        enum: ['XL', 'L', 'M', 'S'],
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'processing', 'pending'],
        default: 'pending'
    }

})

module.exports = mongoose.model('Order', ordersSchema);