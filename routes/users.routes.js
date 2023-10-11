const router = require("express").Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User.model")
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../controllers/user-controller")

router.get('/', getAllUsers)
router.get('/:userId', getOneUser)

router.put('/:userId', async (req, res) => {
  /* PASSWORD CHECK */
  const payload = req.body
  try {
    if (payload.newPassword) {
      const pwCheck = await User.findById(req.params.userId)
      if (bcrypt.compareSync(payload.oldPassword, pwCheck.password)) {

        /* PASSWORD UPDATE */
        const salt = bcrypt.genSaltSync(13);
        payload.password = bcrypt.hashSync(payload.newPassword, salt)
      }
    }
  } catch (error) {
    console.log("An error occurred while verifying the password: ", error)
  }

  delete payload.oldPassword
  delete payload.newPassword
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, payload, {
    new: true,
  })
  res.json(updatedUser)
})

router.delete('/:userId', deleteUser)

// PURCHASES BY SPECIFIC USER
router.get('/:userId/purchases', async (req, res) => {
  try {
    const purchaseByUser = await Purchase.findById(req.params.userId)
      .populate('user')
      .populate('product');
    res.json(purchaseByUser);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error });
  }
});



module.exports = router