const Post = require('../models/post');
const mongoose = require('mongoose');

async function getAll() {
    const posts = await Post.find().select('title description _id');

    return posts;
}

async function create({title, description}) {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        description: description
    });

    try {
        return await post.save();
    } catch(e) {
        throw e;
    }
}

async function getOne({id}) {
    try {
        return await Post.findById(id);
    } catch (e) {
        throw e;
    }
}

async function deleteOne({id}) {
    try {
        await Post.deleteOne({_id: id});

        return {
            message: 'Successfully deleted post with id ' + id
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    deleteOne
};