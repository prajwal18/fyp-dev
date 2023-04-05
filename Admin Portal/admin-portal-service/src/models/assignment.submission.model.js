const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionFile: {
        type: String
    },
    submissionDate: {
        type: Date,
        required: [true, "Provide the date of submission."]
    },
    studentComment: {
        type: String,
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

submissionSchema.index({ assignmentId: 1, submittedBy: 1}, { unique: true });

// Create timestamps. Automatically generate createdAt & updatedAt
submissionSchema.set("timestamps", true);



module.exports = new mongoose.model("AssignmentSubmission", submissionSchema);