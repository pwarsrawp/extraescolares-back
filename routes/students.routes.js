const router = require('express').Router();
const {
  getAllStudents,
  getSomeStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/student-controller');

router.get('/', getAllStudents);
//router.get('/some', getSomeStudents);
router.get('/some/:userId', getSomeStudents);
router.get('/:studentId', getOneStudent);
router.post('/create', createStudent);
router.put('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

module.exports = router;
