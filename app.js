const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);


// handling cors errors and setting headers with restful apis

const userRoutes = require('./api/routes/usersR');
const orderRoutes = require('./api/routes/ordersR');
const productRoutes = require('./api/routes/productsR');


mongoose.connect('mongodb+srv://hashmat2526:' + process.env.MONGO_ATLAS_PW + '@mflix-kkh9f.mongodb.net/pizzmanagement?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {

        console.log(err)
    })



mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next()
})
// routes

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

//error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
const port = 3000;
app.listen(port, () => console.log(port));