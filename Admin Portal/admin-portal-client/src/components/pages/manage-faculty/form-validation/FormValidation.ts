import * as yup from 'yup';

export const AddFacultyIV = {
    name: ""
}

export const FacultySchema = yup.object().shape({
    name: yup.string().required('Provide a name.')
});