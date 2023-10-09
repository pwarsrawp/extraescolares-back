const router = require("express").Router();
const { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity } = require("../controllers/activity-controller")

router.get('/', getAllActivities)
router.get('/:activityId', getOneActivity)
router.post('/create', createActivity)
router.put('/:activityId', updateActivity)
router.delete('/:activityId', deleteActivity)

module.exports = router;