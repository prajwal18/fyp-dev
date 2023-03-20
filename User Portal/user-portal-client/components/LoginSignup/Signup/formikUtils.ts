import * as yup from 'yup';

type SignUpType = {
    name: string, email: string, password: string, contact: string,
    role: string, zipcode: string, address: string, aboutMe: string
}
export const InitialValues: SignUpType = {
    name: '',
    email: '',
    password: '',
    contact: '',
    role: '',
    zipcode: '',
    address: '',
    aboutMe: ''
}

export const SignUpScheama = yup.object().shape({
    name: yup.string().min(2, 'Name cannot be less than 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Please provide your name.'),

    email: yup.string().email().required("Please provide your email."),

    password: yup.string().min(5, "Password should be longer than 5 characters.")
        .required("Please provide your password"),

    contact: yup.string().min(7, 'Contact cannot be less than 7 digits.')
        .max(10, 'Contact no cannot exceed 10 digits').required('Provide your contact no.'),

    role: yup.string().required('Specify your role.'),

    zipcode: yup.string().required('Provide your zip code.'),

    address: yup.string().required('Provide your address.'),

    aboutMe: yup.string().required('Provide a short description about yourself.')

});