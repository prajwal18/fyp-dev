import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import Cookies from 'universal-cookie';

import LoginForm from './LoginForm';
import { apiCallNResp } from '../../../utils/apiCallNResp';
import { httpLogin } from '../../../services/personal.service';
// Use Session hook
import useSession from '../../../hooks/useSession';
// Use Session hook

// Initial Values and Schema
type loginType = {
    email: string, password:string
}
const InitialValues: loginType = {
    email: "", password: ""
}
const Schema = yup.object().shape({
    email: yup.string().email().required("Please provide your email."),
    password: yup.string().min(5, "Password should be longer than 5 characters.").required("Please provide your password")
});
// Initial Values and Schema

const Login = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {setSession} = useSession('admin_session');

    // Handle login

    const handleLogin = async (data:loginType) => {
        const response = await apiCallNResp(() => httpLogin(data));
        if(response){
            cookies.set('admin_token', response.data.token, { path: '/' });
            setSession({_id: response.data._id, name: response.data.name});
            navigate('/admin/');

        } else {
            formik.resetForm();
        }
    }
    // Handle login

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: Schema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: handleLogin
    });
  return (
    <LoginForm formik={formik} />
  )
}

export default Login;