const Activity = require ('../models/Activity.model')

module.exports.getAllActivities = async (req, res) => {
    const allActivities = await Activity.find()
    res.send(allActivities)
}

module.exports.getOneActivity = async (req, res) => {
    const id = req.params.activityId
    const oneActivity = await Activity.findById(id)
    res.send(oneActivity)
}

module.exports.createActivity = async (req, res) => {
    const newActivity = await Activity.create(req.body)
    console.log('New Activity created successfully', newActivity)
    res.send(newActivity)
}

module.exports.updateActivity = async (req, res) => {
    const id = req.params.activityId
    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {new: true})
    console.log('Activity updated successfully', updatedActivity)
    res.send(updatedActivity)
}

module.exports.deleteActivity = async (req, res) => {
    const id = req.params.activityId
    await Activity.findOneAndDelete(id)
    res.status(202).json({ message: 'Activity successfully deleted' })
}