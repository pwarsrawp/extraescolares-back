const Student = require('../models/Student.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllStudents = async (req, res) => {
  const allStudents = await Student.find();
  res.send(allStudents);
};

module.exports.getSomeStudents = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const someStudents = await Student.find({
    user: new ObjectId(`${userId}`),
  });
  console.log(someStudents);
  res.send(someStudents);
};

module.exports.getOneStudent = async (req, res) => {
  const id = req.params.activityId;
  const oneStudent = await Student.findById(id);
  res.send(oneStudent);
};

module.exports.createStudent = async (req, res) => {
  const newStudent = await Student.create(req.body);
  console.log('New Student created successfully', newStudent);
  res.send(newStudent);
};

module.exports.updateStudent = async (req, res) => {
  const id = req.params.studentId;
  const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log('Student updated successfully', updatedStudent);
  res.send(updatedStudent);
};

module.exports.deleteStudent = async (req, res) => {
  const id = req.params.studentId;
  await Student.findOneAndDelete(id);
  res.status(202).json({ message: 'Student successfully deleted' });
};
