const router = require('express').Router();
const { Post, Comment, User } = require('../models');
// const sequelize = require('../config/connection');

//get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'date_posted',
                'content'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['content', 'user_id', 'date_posted'],
                },
                {
                    model: User,
                    attributes: ['username', 'email', 'password']
                }
            ],
        });
        const post = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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

module.exports = router;