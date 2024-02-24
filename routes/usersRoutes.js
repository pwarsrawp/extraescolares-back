const router = require('express').Router();
const { getAllUsers, getUserById, updateUser, updateUserPwd, deleteUser } = require('../controllers/usersController');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.put('/pwd/:userId', updateUserPwd);
router.delete('/:userId', deleteUser);

module.exports = router;
