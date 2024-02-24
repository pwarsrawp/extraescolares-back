const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
};

const getUserById = async (req, res) => {
  const id = req.params.userId;
  const oneUser = await User.findById(id);
  res.send(oneUser);
};

const updateUser = async (req, res) => {
  const id = req.params.activityId;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  console.log('Usuario actualizado correctamente.', updatedUser);
  res.send(updatedUser);
};

const updateUserPwd = async (req, res) => {
  /* PASSWORD CHECK */
  const payload = req.body;
  try {
    if (payload.newPassword) {
      const pwCheck = await User.findById(req.params.userId);
      if (bcrypt.compareSync(payload.oldPassword, pwCheck.password)) {
        /* PASSWORD UPDATE */
        const salt = bcrypt.genSaltSync(13);
        payload.password = bcrypt.hashSync(payload.newPassword, salt);
      }
    }
  } catch (error) {
    console.log('Ha ocurrido un error verificando la contraseña: ', error);
  }
  delete payload.oldPassword;
  delete payload.newPassword;
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, payload, {
    new: true,
  });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const id = req.params.userId;
  await User.findOneAndDelete(id);
  res.status(202).json({ message: 'Usuario borrado correctamente.' });
};

module.exports = { getAllUsers, getUserById, updateUser, updateUserPwd, deleteUser };
