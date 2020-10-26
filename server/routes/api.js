const router = require('express').Router();
const userController = require('../controllers/api/userController');
const noteController = require('../controllers/api/noteController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/deactivate/:id', userController.deactivateUser);

router.get('/notes', noteController.getAllNotes);
router.get('/notes/:id', noteController.getNoteById);
router.post('/notes', noteController.createNote);
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
