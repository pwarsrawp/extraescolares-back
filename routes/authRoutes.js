const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt.middleware');
const { handleLogin, handleSignup, handleVerify, handleRefresh } = require('../controllers/authController');

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/verify', isAuthenticated, handleVerify);
router.get('/refresh', handleRefresh);

module.exports = router;
