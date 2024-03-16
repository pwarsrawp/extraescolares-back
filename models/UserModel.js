const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    memberNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    students: [
      {
        name: { type: String, required: true },
        level: {
          type: String,
          required: true,
          enum: ['3 años', '4 años', '5 años', '1º primaria', '2º primaria', '3º primaria', '4º primaria', '5º primaria', '6º primaria'],
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
