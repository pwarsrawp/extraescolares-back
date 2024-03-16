const Activity = require('../models/ActivityModel');

////////////////////////////////////////
////////// ACTIVITY MODIFIERS //////////
////////////////////////////////////////
const getAllActivities = async (req, res) => {
  const allActivities = await Activity.find();
  res.send(allActivities);
};

const getOneActivity = async (req, res) => {
  const id = req.params.activityId;
  const oneActivity = await Activity.findById(id);
  res.send(oneActivity);
};

const createActivity = async (req, res) => {
  const newActivity = await Activity.create(req.body);
  console.log('Nueva actividad creada correctamente.', newActivity);
  res.send(newActivity);
};

const updateActivity = async (req, res) => {
  const { activityId } = req.params;
  const updatedActivity = await Activity.findByIdAndUpdate(activityId, req.body, { new: true });
  console.log('Actividad actualizada correctamente.', updatedActivity);
  res.send(updatedActivity);
};

const deleteActivity = async (req, res) => {
  const { activityId } = req.params;
  console.log(req.params)
  await Activity.findByIdAndRemove(activityId);
  res.status(202).json({ message: 'Actividad borrada correctamente.' });
};

/////////////////////////////////////
////////// LISTS MODIFIERS //////////
/////////////////////////////////////
const addStudentToCurrentList = async (req, res) => {
  const { activityId } = req.params;
  const { studentId } = req.body;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { $addToSet: { currentList: { studentId } } }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addStudentToWaitingList = async (req, res) => {
  const { activityId } = req.params;
  const { studentId } = req.body;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { $addToSet: { waitingList: { studentId } } }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentFromCurrentList = async (req, res) => {
  const { activityId } = req.params;
  const { studentId } = req.body;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { $pull: { currentList: { studentId } } }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeStudentFromWaitingList = async (req, res) => {
  const { activityId } = req.params;
  const { studentId } = req.body;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { $pull: { waitingList: { studentId } } }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearCurrentList = async (req, res) => {
  const { activityId } = req.params;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { currentList: [] }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const clearWaitingList = async (req, res) => {
  const { activityId } = req.params;
  try {
    const updatedList = await Activity.findByIdAndUpdate(activityId, { waitingList: [] }, { new: true });
    if (!updatedList) {
      res.sendStatus(400);
    } else {
      res.status(200).json(updatedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/////////////////////////////
////////// EXPORTS //////////
/////////////////////////////
module.exports = {
  getAllActivities,
  getOneActivity,
  createActivity,
  updateActivity,
  addStudentToCurrentList,
  addStudentToWaitingList,
  removeStudentFromCurrentList,
  removeStudentFromWaitingList,
  clearCurrentList,
  clearWaitingList,
  deleteActivity,
};
