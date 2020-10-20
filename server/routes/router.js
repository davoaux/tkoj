const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.menu);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/deactivate/:id', userController.deactivateUser);

router.get('/notes', (req, res) => res.send('TODO'));
router.get('/notes/:id', (req, res) => res.send('TODO'));

module.exports = router;
