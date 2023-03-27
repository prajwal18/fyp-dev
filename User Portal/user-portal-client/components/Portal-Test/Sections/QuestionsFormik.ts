import { TypesOfQuestions } from '@/constants/Constants';
import * as yup from 'yup';

export const IV_MCQ = {
    title: '',
    questionType: '',
    marks: 0,
    choices: [],
    correctAnswer: []
}

export const IV_QNA = {
    title: '',
    questionType: TypesOfQuestions.QNA,
    marks: 0
}

export const MCQ_Schema = yup.object().shape({
    title: yup.string().required('Please provide a title for the question.'),
    questionType: yup.string().required('Please provide the question type.'),
    marks: yup.number().min(1, 'Mark cannot be less than 1.').required('Specify the marks.'),
    choices: yup.array().of(yup.mixed())
    .min(1, "At least one choice is required.")
    .required(),
    correctAnswer: yup.array().of(yup.mixed())
    .min(1, "At least one correct answer is required.")
    .required()
});

export const QNA_Schema = yup.object().shape({
    title: yup.string().required('Please provide a title for the question.'),
    questionType: yup.string().required('Please provide the question type.'),
    marks: yup.number().min(1, 'Mark cannot be less than 1.').required('Specify the marks.')
});

export const CreateTestSchema = yup.object().shape({
    title: yup.string().required('Please provide a title for the test.').min(5, 'Title cannot be less than 5 characters.'),
    subtitle: yup.string().min(5, 'Subtitle cannot be less than 5 characters.'),
    courseId: yup.string().required('Please specify the course.'),
    fullMark: yup.number().min(1, 'Full marks cannot be less than 1').typeError('Specify a number value.'),
    releaseDate: yup.date().required('Specify a release date for the test.'),
    dueDate: yup.date().required('Please specify a due date for the test')
});