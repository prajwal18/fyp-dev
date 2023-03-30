import * as yup from "yup";
export const InitialValues = {
    title: '',
    courseId: '',
    fullMark: 0,
    description: '',
    releaseDate: '',
    dueDate: ''
}

export const CASchema = yup.object().shape({
    title: yup.string().required('Please provide a title for the assignment.').min(5, 'Assignemnt Title cannot be less than 5 characters.'),
    courseId: yup.string().required('Please specify the course'),
    fullMark: yup.number().min(1, 'Full marks cannot be less than 1').typeError('Specify a number value.').required(),
    description: yup.string().required('Provide a description').min(10, 'Description has to longer than 10 characters.'),
    releaseDate: yup.date().required('Specify a release date for the Assignment.'),
    dueDate: yup.date().required('Please specify a due date for the Assignment')
})