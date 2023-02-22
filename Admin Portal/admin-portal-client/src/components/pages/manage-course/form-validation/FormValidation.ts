import * as yup from 'yup';

export const AddCourseIV = {
    name: '',
    description: '',
    faculty: ''
}

export const CourseSchema = yup.object().shape({
    name: yup.string().required('Provide a name.'),
    description: yup.string().required('Provide a description.'),
    faculty: yup.string().required('Course must be registered under a faculty.')    
});