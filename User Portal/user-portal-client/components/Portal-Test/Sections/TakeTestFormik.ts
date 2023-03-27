import { TypesOfQuestions } from '@/constants/Constants';
import * as yup from 'yup';

export const IV_MCQ_ANS = {
    title: '',
    questionType: '',
    marks: 0,
    choices: [],
    correctAnswer: [],
    answer: []
}

export const IV_QNA_ANS = {
    title: '',
    questionType: TypesOfQuestions.QNA,
    marks: 0,
    answer: []
}