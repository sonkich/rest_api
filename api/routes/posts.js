const express = require('express');
const router = express.Router();
const postController =  require('./../controllers/post');

const Post = require('../models/post');

router.get('/', async (req, res, next) => {
    try {
        const posts = await postController.getAll();
        const response = {
            count: posts.length,
            posts: posts
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error});
    }
});

router.post('/', async (req, res, next) => {
    const data = {
        title: req.body.title,
        description: req.body.description
    };

    try {
        const post = await postController.create(data);

        res.status(201).json({
            message: 'Created product successfully',
            createdPost: post
        })
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

router.get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const post = await postController.getOne({id: postId});

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'No valid entry found'
            });
        }
    } catch (e) {
        res.status(500).json({error: e.message})
    }
});

router.patch('/:postId', (req, res, next) => {
    // TODO refactor
    const postId = req.params.postId;
    const updateOps = {};

    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Post.update({_id: postId}, {$set: updateOps}).exec().then(response => {
        res.status(200).json({
            message: 'Updated post',
            post: response
        })
    }).catch(error => {
        res.status(500).json({error : error});
    });

});

router.delete('/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    try {
        const result = await postController.deleteOne({id: postId});

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({error: e.message})
    }
});

module.exports = router;