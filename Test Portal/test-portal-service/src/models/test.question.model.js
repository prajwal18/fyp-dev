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
    isReleased: {
        type:Boolean,
        default: false
    },
    releaseDate: {
        type: Date,
        validate: {
            validator: (v) => {
                return v.getTime() > testQuestionSchema.createdAt.getTime();
            },
            message: "Release date should be after the test was created."
        }
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'The test must be assigned under a course']
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Provide the id of the teacher who created the test.']
    },
    fullMark: {
        type: Number,
        min: [1, 'The full mark cannot be less than 1'],
        required: [true, 'Provide a full mark for the test']
    },
    weightage: {
        type: Number,
        min: [1, 'The weightage cannot be less than 1 %'],
        required: [true, 'Provide a weightage for the test']
    },
    instructions: [{
        title: {
            type: String, required: true
        },
        subTitle: {
            type: String
        },
        content: {
            type: String
        }
    }],
    questions: [{
        title: {
            type: String, required: [true, 'Provide a valid question'], unique: [true, 'Cannot repeat the same Question.']
        },
        questionType: {
            type: String,
            enum: QuestionTypes,
            required: [true, 'Specify the question Type']
        },
        marks: {
            type: Number, required: [true, 'Specify the marks associated with the question']
        },
        correctAnswer: {
            type: [String]
        }
    }]
});

//Below line will automatically generate createdAt & updatedAt
testQuestionSchema.set("timestamps", true);

module.exports = mongoose.model('TestQuestions', testQuestionSchema);