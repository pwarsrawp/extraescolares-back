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

const getOneStudent = async (req, res) => {
  const id = req.params.activityId;
  const oneStudent = await Student.findById(id);
  res.send(oneStudent);
};

const createStudent = async (req, res) => {
  console.log(req.body);
  const newStudent = await Student.create(req.body);
  console.log('New Student created successfully', newStudent);
  res.send(newStudent);
};

const updateStudent = async (req, res) => {
  const id = req.params.studentId;
  const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log('Student updated successfully', updatedStudent);
  res.send(updatedStudent);
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  await Student.findOneAndDelete(studentId);
  res.status(202).json({ message: 'Student successfully deleted' });
};

module.exports = { getAllStudents, getStudentsByUserId, getOneStudent, createStudent, updateStudent, deleteStudent };
