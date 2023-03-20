import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
//MUI Componentsp
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//MUI Components

//Login Layout
import LoginSignupLayout from '@/components/Layout/LoginSignupLayout';
import Copyright from '@/components/Common/Copyright';
//Login Layout

// Formik utils
import { LoginSchema, InitialValues } from './formikUtils';
import { GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '@/components/Common/form/PasswordTextField';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUserLogin } from '@/service/user.service';
import { useDispatch } from 'react-redux';
import { updateSessionNTokenAC } from '@/redux/general/actions';
// Formik utils


const HeadSection = () => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "5rem", height: "5rem" }} />
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "10px", textAlign: "center" }}>Join us in educating the world</Typography>
        </>
    )
}

const ButtonSection = ({ isSubmitting }: { isSubmitting: boolean }) => {

    return (
        <Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                disabled={isSubmitting}
            >
                Log in
            </Button>
            <Stack spacing={2} direction="row">
                <Link href="/Auth/SignUp" variant="body2">
                    Create Account
                </Link>
                <Link href="/Auth/ForgotPassword" variant="body2">
                    Forgot Password?
                </Link>
            </Stack>
        </Box>
    )
}

const FormSection = ({ formik }: { formik: any }) => {
    return (
        <>
            <Stack component="form" sx={{ mt: 3, width: "100%" }} spacing={2} onSubmit={formik.handleSubmit}>
                <GenerateCustTextField
                    formik={formik}
                    name='email'
                    label='Email'
                />
                <PasswordTextField
                    formik={formik}
                    name='password'
                    label='Password'
                />
                <ButtonSection isSubmitting={formik.isSubmitting} />
            </Stack>
        </>
    )
}

const LoginSection = ({ formik }: { formik: any }) => {

    return (
        <Box sx={{ width: "500px", padding: "30px", borderRadius: "5px", background: "white" }}>
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <HeadSection />
                {/* Head Section */}

                {/* Form Section */}
                <FormSection formik={formik} />
                {/* Form Section */}
            </Stack>

            <Copyright />
        </Box>
    );
}

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: LoginSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                //dispatch(loginAC(values));
                const response = await apiCallNResp(() => httpUserLogin(values));
                if (response && response.success) {
                    toast.success('Login successful.');
                    dispatch(updateSessionNTokenAC(response.data));
                    router.push(`/${response.data.role}/Dashboard`);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setTimeout(() => formik.resetForm(), 200);
            }
        }
    });

    return (
        <LoginSignupLayout type="login">
            <LoginSection formik={formik} />
        </LoginSignupLayout>
    )
}

export default LoginPage;