const router = require('express').Router();
const userController = require('../controllers/api/userController');
const noteController = require('../controllers/api/noteController');
const auth = require('../middlewares/check-auth');

// Authentication routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/change_password', auth, userController.changePassword);

// User routes
router.get('/users', auth, userController.getAllUsers);
router.get('/users/:id', auth, userController.getUserById);
router.put('/users/:id', auth, userController.updateUser);
router.get('/users/:id/notes', auth, userController.getNotes);
router.get('/users/email/:email', auth, userController.getUserByEmail);
router.delete('/users/:id', auth, userController.deleteUser);

// Note routes
router.get('/notes', auth, noteController.getAllNotes);
router.get('/notes/:id', auth, noteController.getNoteById);
router.post('/notes', auth, noteController.createNote);
router.put('/notes', auth, noteController.updateNote);
router.delete('/notes/:id', auth, noteController.deleteNote);

module.exports = router;
