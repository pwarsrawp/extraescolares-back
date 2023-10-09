const List = require ('../models/List.model')

module.exports.getAllLists = async (req, res) => {
    const allLists = await List.find()
    res.send(allLists)
}

module.exports.getOneList = async (req, res) => {
    const id = req.params.activityId
    const oneList = await List.findById(id)
    res.send(oneList)
}

module.exports.createList = async (req, res) => {
    const newList = await List.create(req.body)
    console.log('New List created successfully', newList)
    res.send(newList)
}

module.exports.updateList = async (req, res) => {
    const id = req.params.listId
    const updatedList = await List.findByIdAndUpdate(id, req.body, {new: true})
    console.log('List updated successfully', updatedList)
    res.send(updatedList)
}

module.exports.deleteList = async (req, res) => {
    const id = req.params.listId
    await List.findOneAndDelete(id)
    res.status(202).json({ message: 'List successfully deleted' })
}