const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/post');

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs
            };
            res.status(200).json(response);

        })
        .catch(error => {
            res.status(500).json({error : error});
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result);
    }).catch(error => {
        console.error(error);
    });

    res.status(201).json({
        message: 'Created product successfully',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({error: error})
        })
});

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};

    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: productId}, {$set: updateOps}).exec().then(response => {
        res.status(200).json({
            message: 'Updated product',
            product: response
        })
    }).catch(error => {
        res.status(500).json({error : error});
    });

});

router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.remove({_id: productId})
        .exec()
        .then(res => {
            res.status(200).json(res);
        })
        .catch(error => {
            res.status(500).json({error: error})
        });
});

module.exports = router;