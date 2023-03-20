import * as yup from 'yup';

type loginType = {
    email: string, password:string
}
export const InitialValues: loginType = {
    email: "", password: ""
}
export const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Please provide your email."),
    password: yup.string().min(5, "Password should be longer than 5 characters.").required("Please provide your password")
});