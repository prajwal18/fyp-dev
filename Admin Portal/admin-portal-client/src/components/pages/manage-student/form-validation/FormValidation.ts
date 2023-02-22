import * as yup from 'yup';
import { UserTypes } from '../../../../constants/Constants';

export const AddStudentIV = {
    email: '',
    password: '',

    contact: '',
    address: '',
    zipcode: '',

    role: UserTypes.STUDENT,
    name: '',

    aboutMe: ''
}

export const StudentSchema = yup.object().shape({
    email: yup.string().email().typeError('Provide a valid email.')
    .required('Provide an email.'),
    password: yup.string().min(5, 'Password cannot be less than 5 characters.').required('Provide a password'),
    contact: yup.string()
        .matches(/^[0-9]+$/, "Phone Number must be only digits.")
        .min(7, "Phone number cannot be less than 7 digits.")
        .max(10, "Phone number cannot exceed 10 digits.")
        .required("Please provide a valid phone number."),
    address: yup.string().required('Provide an address.'),
    zipcode: yup.string().required('Provide a zipcode'),
    name: yup.string().required('Provide a name.'),
    aboutMe: yup.string().required('Provide a short description.')
    
});