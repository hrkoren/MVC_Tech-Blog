const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/posts', (req, res) => {
    res.render('posts');
});

//display all posts
router.get('/', withAuth, (req, res) => {
    // console.log(req.session);
    Post.findAll({
        where: {
            user_id: req.session.id,
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
                attributes: [
                    'id',
                    'content',
                    'post_id',
                    'user_id',
                    'date_posted'],
                include: {
                    model: User,
                    attributes: ['username']
                },
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
            // console.log(posts);
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err.message);
        });
});

router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id, {

        attributes: [
            'id',
            'title',
            'content',
            'date_posted'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'date_posted']
            }
        ]
    })
        .then(data => {
            if (!data) {
                res.status(404).status({ message: 'No posts found with that information.' });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;