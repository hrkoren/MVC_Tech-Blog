const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//Get posts
router.get('/', (req, res) => {
    Post.findAll({
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
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get by id
router.get('/posts/:id', (req, res) => {
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
        .then(data => res.json(data))
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
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/posts', (req, res) => {
    res.render('posts');
});


module.exports = router;