const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//display all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'date_posted'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'date_posted'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(data => {
            const posts = data.map(post =>
                post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;