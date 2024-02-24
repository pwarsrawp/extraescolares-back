const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleSignup = async (req, res) => {
  const payload = req.body;
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);
  try {
    await User.create({
      name: payload.name,
      surname: payload.surname,
      email: payload.email,
      phone: payload.phone,
      memberNumber: payload.memberNumber,
      password: passwordHash,
    });
    res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'El mail introducido ya está en uso.' });
  }
};

const handleLogin = async (req, res) => {
  const payload = req.body;
  const foundUser = await User.findOne({ email: payload.email });
  if (foundUser) {
    const doPasswordsMatch = bcrypt.compareSync(payload.password, foundUser.password);
    if (doPasswordsMatch) {
      const accessToken = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '15s',
      });
      const refreshToken = jwt.sign({ userId: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
      });
      await User.findByIdAndUpdate(foundUser._id, { refreshToken: refreshToken });
      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ accessToken });
    } else {
      res.status(401).json({ errorMessage: 'Las contraseña introducida no es correcta.' });
    }
  } else {
    res.status(401).json({ errorMessage: 'El email introducido no es correcto.' });
  }
};

const handleVerify = async (req, res) => {
  const currentUser = await User.findById(req.payload.userId);
  currentUser.password = '**********';
  res.status(200).json({ message: 'Token OK', currentUser });
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id.toString() !== decoded.userId) return res.sendStatus(403); // Forbidden
    const accessToken = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '60s',
    });
    res.json({ accessToken });
  });
};

const handleLogout = async (req, res) => {
  // Remember to delete accessToken on client side.
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;
  // Is refresh token in db?
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }
  // Delete the refresh token in db
  await User.findByIdAndUpdate(foundUser._id, {refreshToken: ''})
  res.clearCookie('jwt', { httpOnly: true }); // secure: true - only serves on https
  res.sendStatus(204)
};

module.exports = { handleSignup, handleLogin, handleVerify, handleRefreshToken, handleLogout };
