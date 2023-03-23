const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionFile: {
        type: String,
        required: [true, 'Provide your assignment file. Format: .pdf']
    },
    remark: {
        type: String, 
        minLength: [10, 'Remark has to be longer than 10 characters.']
    },
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isGraded: {
        type: Boolean,
        default: false
    },
    marksObtained: {
        type: Number,
        min: 0
        // cannot be more than total marks of the assignment
    }
});

// Create timestamps. Automatically generate createdAt & updatedAt
submissionSchema.set("timestamps", true);


module.exports = new mongoose.model("AssignmentSubmission", submissionSchema);