const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
};

module.exports.getOneUser = async (req, res) => {
  const id = req.params.userId;
  const oneUser = await User.findById(id);
  res.send(oneUser);
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.activityId;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  console.log('User updated successfully', updatedUser);
  res.send(updatedUser);
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.userId;
  await User.findOneAndDelete(id);
  res.status(202).json({ message: 'User successfully deleted' });
};
