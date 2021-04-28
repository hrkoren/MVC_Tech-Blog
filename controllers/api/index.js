const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('./posts', postRoutes);
router.use('./comments', commentRoutes);
router.use('./login', userRoutes);

module.exports = router;