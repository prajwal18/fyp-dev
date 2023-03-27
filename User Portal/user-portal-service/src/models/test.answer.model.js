const mongoose = require('mongoose');
// Importing the Questions Types
const { QuestionTypes } = require("../constants/enum");

const testAnswerPaperSchema = mongoose.Schema({
    testPaperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestPaper',
        required: [true, "Provide a Reference to the original Test paper"]
    },
    submissionDate: {
        type: Date,
        required: [true, "Provide the date of submission."]
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Provide the student who submitted the test"]
    },
    marksObtained: {
        type: Number,
        min: [0, 'Marks obtained cannot be less than 0.']
    },
    remark: {
        type: String,
        minLength: [2, 'Remark cannot be less than 2 characters.'],
        maxLength: [1000, 'The remark cannot exceed 1000 characters.']
    },
    // Represents the teacher who scored/graded the test paper
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isGraded: {
        type: Boolean,
        default: false
    },
    questions: [{
        // Note: On deciding wheter the answer's correct or incorrect
        // you can give the ui a color red it the marks obtained is 
        // less than 50% of marks. Else a green background
        title: {
            type: String, 
            required: [true, 'Provide a valid question'], 
            unique: [true, 'Cannot repeat the same Question.']
        },
        questionType: {
            type: String,
            enum: QuestionTypes,
            required: [true, 'Specify the question Type']
        },
        marks: {
            type: Number, required: [true, 'Specify the marks associated with the question']
        },
        choices: {
            type: [String]
        },
        correctAnswer: {
            type: [String]
        },
        answer: {
            type: [String]
            // For every type of question, the answer will be stored in an array.
            // For MCQ_CHOOSE_ONE and QNA type question the array will contain one string
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

module.exports = mongoose.model('TestAnswerPaper', testAnswerPaperSchema);