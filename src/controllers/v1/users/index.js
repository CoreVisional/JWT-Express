const GetController = require('./get');
const PostController = require('./post');

module.exports = {
    ...GetController,
    ...PostController,
};
