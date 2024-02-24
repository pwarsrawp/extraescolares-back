const router = require('express').Router();
const { getAllStudents, getStudentsByUserId, getOneStudent, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsController');

router.get('/', getAllStudents);
//router.get('/some', getSomeStudents);
router.get('/user/:userId', getStudentsByUserId);
router.get('/:studentId', getOneStudent);
router.post('/create', createStudent);
router.put('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

module.exports = router;
