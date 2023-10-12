const router = require("express").Router();
const { getAllLists, getOneList, createList, updateList, deleteList } = require("../controllers/list-controller")

router.get('/', getAllLists)
router.get('/:listId', getOneList)
router.post('/create', createList)
router.put('/:listId', updateList)
router.delete('/:listId', deleteList)

module.exports = router;