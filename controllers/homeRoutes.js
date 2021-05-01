const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');

//get all posts for homepage
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
        .then(postData => {
            const posts = postData.map((post =>
                post.get({ plain: true })

            ));
            console.log(posts);
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', ,]
                },
            ]
        });
        const post = post.get({ plain: true });

        res.render('post', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;