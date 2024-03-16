const Student = require('../models/StudentModel');
const ObjectId = require('mongoose').Types.ObjectId;

const getAllStudents = async (req, res) => {
  const allStudents = await Student.find();
  res.send(allStudents);
};

const getStudentsByUserId = async (req, res) => {
  const userId = req.params.userId;
  const students = await Student.find({
    user: new ObjectId(`${userId}`),
  });
  res.send(students);
};

const getStudentById = async (req, res) => {
  const id = req.params.studentId;
  const oneStudent = await Student.findById(id);
  res.send(oneStudent);
};

const createStudent = async (req, res) => {
  const newStudent = await Student.create(req.body);
  console.log('Nuevo alumno creado correctamente.', newStudent);
  res.send(newStudent);
};

const updateStudent = async (req, res) => {
  const id = req.params.studentId;
  const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log('Alumno actualizado correctamente.', updatedStudent);
  res.send(updatedStudent);
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;
  await Student.findOneAndDelete(studentId);
  res.status(202).json({ message: 'Alumno borrado correctamente.' });
};

module.exports = { getAllStudents, getStudentsByUserId, getStudentById, createStudent, updateStudent, deleteStudent };
