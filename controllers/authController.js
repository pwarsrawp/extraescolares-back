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
  if (!foundUser) return res.status(401).json({ errorMessage: 'El email introducido no es correcto.' });
  const doPasswordsMatch = bcrypt.compareSync(payload.password, foundUser.password);
  if (doPasswordsMatch) {
    const token = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
    });
    res.json({token});
  } else {
    res.status(401).json({ errorMessage: 'Las contraseña introducida no es correcta.' });
  }
};

const handleVerify = async (req, res) => {
  const currentUser = await User.findById(req.payload.userId);
  currentUser.password = '**********';
  res.status(200).json({ message: 'Token OK', currentUser });
};

module.exports = { handleSignup, handleLogin, handleVerify };
