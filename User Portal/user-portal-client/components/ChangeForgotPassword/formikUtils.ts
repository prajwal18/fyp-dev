import * as yup from 'yup';

type ChangePasswordType = {
    oldPassword: string, newPassword: string, confirmPassword: string
}
export const InitialValues: ChangePasswordType = {
    oldPassword: "", newPassword: "", confirmPassword: ""
}
export const ChangePasswordSchema = yup.object().shape({
    oldPassword: yup.string().min(5, "Password should be longer than 5 characters.").required("Please provide your old password."),
    newPassword: yup.string()
    .min(5, "Password should be longer than 5 characters.")
    .notOneOf([yup.ref('oldPassword')], 'New password should be diffent than the old one.')
    .required("Please provide your new password."),
    confirmPassword: yup.string()
    .min(5, "Password should be longer than 5 characters.")
    .oneOf([yup.ref('newPassword')], "Passwords don't match!")
    .required("Please provide your new password again.")

});