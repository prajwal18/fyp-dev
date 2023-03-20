import * as yup from 'yup';

type EditProfileType = {
    name: string, email: string, contact: string,
    zipcode: string, address: string, aboutMe: string
}
export const InitialValues: EditProfileType = {
    name: '',
    email: '',
    contact: '',
    zipcode: '',
    address: '',
    aboutMe: '',
}

export const EditProfileSchema = yup.object().shape({
    name: yup.string().min(2, 'Name cannot be less than 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Please provide your name.'),

    email: yup.string().email().required("Please provide your email."),

    contact: yup.string().min(7, 'Contact cannot be less than 7 digits.')
        .max(10, 'Contact no cannot exceed 10 digits').required('Provide your contact no.'),

    zipcode: yup.string().required('Provide your zip code.'),

    address: yup.string().required('Provide your address.'),

    aboutMe: yup.string().required('Provide a short description about yourself.')

});