const router = require('express').Router();
const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.getAllStudents);
router.get('/user/:userId', studentsController.getStudentsByUserId);
router.get('/:studentId', studentsController.getStudentById);
router.post('/create', studentsController.createStudent);
router.put('/:studentId', studentsController.updateStudent);
router.delete('/:studentId', studentsController.deleteStudent);

module.exports = router;
