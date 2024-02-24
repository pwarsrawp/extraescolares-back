const Activity = require('../models/ActivityModel');

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
  console.log('New Activity created successfully', newActivity);
  res.send(newActivity);
};

const updateActivity = async (req, res) => {
  const id = req.params.activityId;
  const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  console.log('Activity updated successfully', updatedActivity);
  res.send(updatedActivity);
};

const deleteActivity = async (req, res) => {
  const id = req.params.activityId;
  await Activity.findOneAndDelete(id);
  res.status(202).json({ message: 'Activity successfully deleted' });
};

module.exports = { getAllActivities, getOneActivity, createActivity, updateActivity, deleteActivity };