const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userM');

exports.users_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'Mail exists' })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash,
                            isAdmin: req.body.isAdmin
                        });
                        user
                            .save()
                            .then(result => {
                                console.log('user saved ' + result);
                                res.status(200).json({
                                    message: 'user created successfully'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: err
                                })
                            })
                    }
                })
            }
        })
        .catch()
}
exports.users_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Auth Failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    result.status = 'online';
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "9h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}
exports.users_delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'user deleted' })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}
exports.users_get_all_users = (req, res, next) => {
    User.find()
        .select('_id email isAdmin status')
        .exec()
        .then(users => {
            const response = {
                Total: users.length,
                users: users.map(user => {
                    return {
                        _id: user._id,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        status: user.status
                    }
                })
            }
            res.status(200).json(response)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
}
exports.users_with_certain_orders = (req, res, next) => {

}