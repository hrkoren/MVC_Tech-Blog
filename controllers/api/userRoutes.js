const router = require('express').Router();
const { User } = require('../../models');
const session = require('express-session');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        },
    })
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err.message);
        });
});

// router.post('/', async (req, res) => {
//     try {
//         const userData = await User.create(req.body);
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             res.status(200).json(userData);
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/login', async (req, res) => {
    console.log('/login');
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData);
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again.' });
            return;
        }
        const validPwd = await userData.checkPassword(req.body.password);
        if (!validPwd) {
            res.status(400).json({ message: 'Incorrect email or password, please try again.' });
            return;
        }
        req.session.save(() => {
            // console.log(userData);
            req.session.id = UserData.id;
            req.session.username - UserData.username;
            req.session.loggedIn = true;
            // console.log(userData);
            res.status(200).json({ user: userData, message: 'You are successfully logged in! Happy Blogging!' });
        });
        // res.redirect('dashboard');
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/dashboard', (req, res) => {
    res.redirect('dashboard');
});

module.exports = router;