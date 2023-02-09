const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionFile: {
        type: String,
        required: [true, '']
    },
    remark: {
        type: String, 
        minLength: [100, ''],
        maxLength: [1000, '']
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isGraded: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number,
        min: 0,
        max: 100
    }
});

// Create timestamps. Automatically generate createdAt & updatedAt
submissionSchema.set("timestamps", true);
