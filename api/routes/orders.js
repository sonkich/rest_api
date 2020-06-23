const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get requests to /orders'
    })
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity:  req.body.quantity
    };

    res.status(201).json({
        message: 'Handling post requests to /orders',
        order: order
    })
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;

    res.status(200).json({
        message: 'spec',
        id: orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;

    res.status(200).json({
        message: 'Order deleted'
    })
});

module.exports = router;