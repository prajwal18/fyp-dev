import * as yup from 'yup';

type CreateTestType = {
    title: string, subtitle: string, courseId: string,
    fullMark: number, releaseDate: string, dueDate: string
}
export const InitialValues: CreateTestType = {
    title: '',
    subtitle: '',
    courseId: '',
    fullMark: 0,
    releaseDate: '',
    dueDate: ''
}
export const CreateTestSchema = yup.object().shape({
    title: yup.string().required('Please provide a title for the test.').min(5, 'Title cannot be less than 5 characters.'),
    subtitle: yup.string().min(5, 'Subtitle cannot be less than 5 characters.'),
    courseId: yup.string().required('Please specify the course.'),
    fullMark: yup.number().min(1, 'Full marks cannot be less than 1').typeError('Specify a number value.'),
    releaseDate: yup.date().required('Specify a release date for the test.'),
    dueDate: yup.date().required('Please specify a due date for the test')
});