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
                return v.getTime() >= assignmentSchema.createdAt.getTime();
            },
            message: "Release date should be after the assignment was created."
        },
        required: [true, 'Assignment needs to have a release date.']
    },
    dueDate: {
        type: Date,
        required: [true, 'Provide a due date for assignment submission.'],
        alidate: {
            validator: (v) => {
                return v.getTime() >= assignmentSchema.releaseDate.getTime();
            },
            message: "Due date comes after the assignment's created."
        }
    },
    totalMarks: {
        type: Number,
        min: [1, 'Total marks cannot be less than 1']
    },
    description: {
        type: String,
        minLength: [20, 'Assignment description cannot be less than 20 characters.']
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