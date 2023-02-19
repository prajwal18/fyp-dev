import * as yup from 'yup';

export const AddAdminIV = {
    name: '',
    email: '',
    password: '',
    contact: '',
    profilePicture: ''
}

export const AdminSchema = yup.object().shape({
    name: yup.string().required('Provide a name.'),
    email: yup.string().email().required('Provide a valid email.'),
    password: yup.string().min(5, 'Password cannot be less than 5 characters.'),
    contact: yup.string()
    .matches(/^[0-9]+$/, "Phone Number must be only digits")
    .min(7, "Phone number cannot be less than 7 digits")
    .max(10, "Phone number cannot exceed 10 digits.")
    .required("Please provide a valid phone number.")
});