const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt.middleware');
const authController = require('../controllers/authController');

router.post('/signup', authController.handleSignup);
router.post('/login', authController.handleLogin);
router.get('/verify', isAuthenticated, authController.handleVerify);
router.get('/refresh', authController.handleRefreshToken);
router.get('/logout', authController.handleLogout);

module.exports = router;
