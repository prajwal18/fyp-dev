const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [5, ''],
        maxLength: [50, ''],
        required: [true, '']
    },
    weightage: {
        type: Number,
        required: [true, '']
    },
    assignedDate: {
        type: Date,
        required: [true, '']
    },
    dueDate: {
        type: Date,
        required: [true, '']
    },
    description: {
        type: String,
        minLength: [20, ''],
        maxLength: [1000, '']
    },
    manual: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    makeAvailable: {
        type: Boolean,
        default: false
    }
});

//Below line will automatically generate createdAt & updatedAt
assignmentSchema.set("timestamps", true);

module.exports = new mongoose.model("Assignment", assignmentSchema);