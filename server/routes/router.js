const userController = require('../controllers/userController');

const router = require('express').Router();

router.get('/', userController.menu);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/deactivate/:id', userController.deactivateUser);

module.exports = router;
