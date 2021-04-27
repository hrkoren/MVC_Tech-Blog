const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'coneent', 'username', 'date_created'],
        // include: [
        //     {
        //         model: 
        //     }
        // ]
    })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No blog posts yet' });
                return;
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

//creat new post
// router.post('/', (req, res) => {
//     Post.create(req.body)
//         .then((post) => {
//             if (req.body.post)
//     })
// })

