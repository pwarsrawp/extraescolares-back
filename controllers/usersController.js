const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const oneUser = await User.findById(userId);
  res.send(oneUser);
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
  console.log('Usuario actualizado correctamente.', updatedUser);
  res.send(updatedUser);
};

const createStudent = async (req, res) => {
  const userId = req.params.userId;
  const newStudent = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { students: newStudent } }, { new: true });
  console.log('Alumno creado correctamente.', updatedUser);
  res.send(updatedUser);
};

const deleteStudent = async (req, res) => {
  const userId = req.params.userId;
  const studentId = req.body.studentId;
  const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { students: { _id: studentId } } }, { new: true });
  console.log('Alumno eliminado correctamente.', updatedUser);
  res.send(updatedUser);
};

const editStudent = async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const updatedUser = await User.updateOne({ _id: userId, 'students._id': body._id }, { $set: { 'students.$.name': body.name, 'students.$.level': body.level } }, { new: true });
  console.log('Alumno actualizado correctamente.', updatedUser);
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

module.exports = { getAllUsers, getUserById, updateUser, createStudent, deleteStudent, editStudent, updateUserPwd, deleteUser };
