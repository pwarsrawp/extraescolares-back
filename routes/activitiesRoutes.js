const router = require('express').Router();
const activitiesController = require('../controllers/activitiesController');
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/', verifyJWT, activitiesController.getAllActivities);
router.get('/:activityId', activitiesController.getOneActivity);
router.post('/create', activitiesController.createActivity);
router.put('/:activityId', activitiesController.updateActivity);
router.delete('/:activityId', activitiesController.deleteActivity);

module.exports = router;
