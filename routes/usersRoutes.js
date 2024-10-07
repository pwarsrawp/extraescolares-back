const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUser);
router.put('/add/:userId', usersController.createStudent);
router.put('/delete/:userId', usersController.deleteStudent);
router.put('/edit/:userId', usersController.editStudent);
router.put('/pwd/:userId', usersController.updateUserPwd);
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
