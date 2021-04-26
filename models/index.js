const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasOne(User, {
    foreignKey: 'user_id'
});

Comment.hasOne(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Comment, Post };