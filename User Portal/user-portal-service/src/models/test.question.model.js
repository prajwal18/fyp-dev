const mongoose = require('mongoose');
// Importing the Questions Types
const { QuestionTypes } = require("../constants/enum");

const testQuestionSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'Test title cannot be less than 5 characters long'],
        maxLength: [100, 'Test title cannot exceed 100 characters'],
        required: [true, 'Provide a tile for the test']
    },
    subtitle: {
        type: String,
        minLength: [5, 'Test subtitle cannot be less than 5 characters long'],
        maxLength: [255, 'Test subtitle cannot exceed 255 characters']
    },
    releaseDate: {
        type: Date,
        validate: {
            validator: (v) => {
                if(testQuestionSchema.createdAt) {
                    return v.getTime() >= testQuestionSchema.createdAt.getTime();
                } else {
                    return v.getTime() > Date.now();
                }
            },
            message: "Release date should be after the test was created."
        },
        required: [true, 'Test needs to have a release date.']
    },
    dueDate: {
        type: Date,
        validate: {
            validator: (v) => {
                if(testQuestionSchema.releaseDate) {
                    return v.getTime() >= testQuestionSchema.releaseDate.getTime();
                } else {
                    return v.getTime() > Date.now();
                }
            },
            message: "Due date should be after the test was created."
        },
        required: [true, 'Test needs to have a dueDate']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Specify the course for the test.']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Specify the teacher who created the test.']
    },
    fullMark: {
        type: Number,
        min: [1, 'The full mark cannot be less than 1'],
        required: [true, 'Provide a full mark for the test']
    },
    instructions: {
        type: String
    },
    questions: {
        type: [
            {
                title: {
                    type: String, required: [true, 'Provide a valid question'], unique: [true, 'Cannot repeat the same Question.']
                },
                questionType: {
                    type: String,
                    enum: QuestionTypes,
                    required: [true, 'Specify the question Type']
                },
                marks: {
                    type: Number,
                    required: [true, 'Specify the marks associated with the question'],
                    min: [0, 'Score obtained cannot be less than 0.']
                },
                correctAnswer: {
                    type: [String]
                }
            }
        ]
    },
});

//Below line will automatically generate createdAt & updatedAt
testQuestionSchema.set("timestamps", true);

module.exports = mongoose.model('TestPaper', testQuestionSchema);