const router = require('express').Router();
const { Post, Comment } = require('../models');
const sequelize = require('../config/connection');

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
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;