const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    price: {
        type: Number,
        required: true
    },
    flavor: {
        type: String,
        enum: [
            'Macaroni And Cheese Pizza',
            'Sweet Ricotta Pizza',
            'Brown Butter Lobster Pizza',
            'Grilled Zucchini Pizza',
            'Chicken Alfredo Pizza',
            'Taco Quesadila Pizza',
            'Caramel Apple Pizza',
            'BBQ Pizza',
            'Chicken Achari Pizza',
            'Chicken Fajita Pizza',
            'Vegetable Pizza'
        ],
        required: true
    },
    productImage: {
        type: String
    }
},
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } })


module.exports = mongoose.model('Product', productSchema);