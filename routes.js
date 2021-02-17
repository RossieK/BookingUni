const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const otherController = require('./controllers/otherController');

router.use('/', homeController);
router.use('/user', userController);
router.use('/other', otherController);


module.exports = router;