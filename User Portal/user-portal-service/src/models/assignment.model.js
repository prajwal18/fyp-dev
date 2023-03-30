const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'Assignment title cannot be less than 5 characters.'],
        maxLength: [100, 'Assignment title cannot exceed 100 characters.'],
        required: [true, 'Provide a title for the assignment.']
    },
    releaseDate: {
        type: Date,
        validate: {
            validator: (v) => {
                if(assignmentSchema.createdAt) {
                    return v.getTime() >= assignmentSchema.createdAt.getTime();
                } else {
                    return v.getTime() >= new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
                }
            },
            message: "Release date should be after the assignment was created."
        },
        required: [true, 'Assignment needs to have a release date.']
    },
    dueDate: {
        type: Date,
        required: [true, 'Provide a due date for assignment submission.'],
        validate: {
            validator: (v) => {
                if(assignmentSchema.releaseDate) {
                    return v.getTime() >= assignmentSchema.releaseDate.getTime();
                } else {
                    return v.getTime() > Date.now();
                }
            },
            message: "Due date should be after the assignment was created."
        },
    },
    fullMark: {
        type: Number,
        min: [1, 'Total marks cannot be less than 1'],
        required: [true, "Assignment needs to have a full marks"]
    },
    description: {
        type: String,
        minLength: [5, 'Assignment description cannot be less than 5 characters.'],
        require: [true, "Assignment needs to have a description."]
    },
    manual: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Specify the teacher who created the assignment.']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Specify the course for which the assignment was created.']
    }
});

//Below line will automatically generate createdAt & updatedAt
assignmentSchema.set("timestamps", true);

module.exports = new mongoose.model("Assignment", assignmentSchema);