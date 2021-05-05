const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');



router.get('/login', (req, res) => {
    console.log('login route');
    res.render('login');
});

router.get('/:id', async (req, res) => {
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

        res.render('posts', {
            ...post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

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
        .then(data => {
            const post = data.map((post =>
                post.get({ plain: true })

            ));
            console.log(post);
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

module.exports = router;