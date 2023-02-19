const mongoose = require('mongoose');
// Importing the Questions Types
const { QuestionTypes } = require("../constants/enum");

const testAnswerPaperSchema = mongoose.Schema({
    testPaperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestQuestions',
        required: [true, "Provide a Reference to the original Test paper"]
    },
    submissionDate: {
        type: Date
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Provide the student who submitted the test"]
    },
    score: {
        type: Number,
        min: [0, 'The score cannot be less than 0']
    },
    remark: {
        type: String,
        minLength: [2, 'Please provide a remark longer than 2 characters.'],
        maxLength: [1000, 'The remark cannot exceed 1000 characters.']
    },
    // Represents the teacher who scored/graded the test paper
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
        },
        answer: {
            type: [String]
            // For every type of question, the answer will be stored in an arrray.
            // For MCQ_CHOOSE_ONE and QNA type question the list will contain one string
        },
        feedback: {
            type: String
        },
        marksObtained: {
            type: Number,
            min: [0, 'Score obtained cannot be less than 0.']
            // Note marks obtained has to be less than equal to marks for the particular question.
        }
    }]
});

//Below line will automatically generate createdAt & updatedAt
testAnswerPaperSchema.set("timestamps", true);

module.exports = mongoose.model('TestAnswers', testAnswerPaperSchema);