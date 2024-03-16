const router = require('express').Router();
const activitiesController = require('../controllers/activitiesController');

// ACTIVITY MODIFIERS
router.get('/', activitiesController.getAllActivities);
router.get('/:activityId', activitiesController.getOneActivity);
router.post('/create', activitiesController.createActivity);
router.put('/:activityId', activitiesController.updateActivity);
router.delete('/:activityId', activitiesController.deleteActivity);
// LIST MODIFIERS
router.put('/:activityId/add-current', activitiesController.addStudentToCurrentList);
router.put('/:activityId/add-waiting', activitiesController.addStudentToWaitingList);
router.put('/:activityId/remove-current', activitiesController.removeStudentFromCurrentList);
router.put('/:activityId/remove-waiting', activitiesController.removeStudentFromWaitingList);
router.put('/:activityId/clear-current', activitiesController.clearCurrentList);
router.put('/:activityId/clear-waiting', activitiesController.clearWaitingList);

module.exports = router;
