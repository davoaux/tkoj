const router = require('express').Router();
const userController = require('../controllers/api/userController');
const noteController = require('../controllers/api/noteController');
const auth = require('../middlewares/check-auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', auth, userController.getAllUsers);
router.get('/users/:id', auth, userController.getUserById);
router.get('/users/email/:email', auth, userController.getUserByEmail);
router.put('/users/deactivate/:id', auth, userController.deactivateUser);

router.get('/notes', auth, noteController.getAllNotes);
router.get('/notes/:id', auth, noteController.getNoteById);
router.post('/notes', auth, noteController.createNote);
router.delete('/notes/:id', auth, noteController.deleteNote);

module.exports = router;
