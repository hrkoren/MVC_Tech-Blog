const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//Get posts
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
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'date_posted'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(data => {
            const posts = data.map(post =>
                post.get({ plain: true }));
            res.render('posts', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/posts', (req, res) => {
    res.render('posts');
});

// get by id
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
    then(data => {
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

//create new post
router.post('/posts', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
    })
    then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;