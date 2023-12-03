const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    memberNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    students: [
      {
        name: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
