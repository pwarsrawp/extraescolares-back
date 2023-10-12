const router = require("express").Router();
const { getAllStudents, getOneStudent, createStudent, updateStudent, deleteStudent } = require("../controllers/student-controller")

router.get('/', getAllStudents)
router.get('/:studentId', getOneStudent)
router.post('/create', createStudent)
router.put('/:studentId', updateStudent)
router.delete('/:studentId', deleteStudent)

module.exports = router;