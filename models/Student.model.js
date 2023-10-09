const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name:{
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      enum: ['3 años', '4 años', '5 años', '1º primaria', '2º primaria', '3º primaria', '4º primaria', '5º primaria', '6º primaria'],
    }
  },
  {
    timestamps: true
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;