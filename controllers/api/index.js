const router = require('express').Router();
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;