const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'date_posted',
            'content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'user_id', 'date_posted'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ],
    })
        .then(data => {
            const post = data.map((post) =>
                post.get({ plain: true })

            );
            // console.log(post);
            res.render('homepage', {
                post,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//one post by id
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

//login
router.get('/login', (req, res) => {
    // console.log('login route');
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;