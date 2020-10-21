const userController = require('../controllers/api/userController');

const router = require('express').Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);

router.get('/notes', (req, res) => res.send('TODO'));
router.get('/notes/:id', (req, res) => res.send('TODO'));

module.exports = router;
