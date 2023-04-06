import React, { useState, useEffect } from 'react';
import LoginSignupLayout from "../Layout/LoginSignupLayout";        // The layout that will be used

//MUI Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../Common/Copyright';
import LinearProgress from '@mui/material/LinearProgress';
//MUI Components

//MUI Icon
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from 'next/router';
//MUI Icon

import { toast } from "react-toastify";
import { useFormik } from 'formik';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpGetOtp, httpResetPassword, httpVerifyOtp } from '@/service/user.service';
import { GenerateCustTextField } from '../Common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '../Common/form/PasswordTextField';

const HeadSection = ({ subText }: { subText: string }) => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "4.5rem", height: "4.5rem" }}>
                <LockIcon fontSize='large' />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot Password - {subText}
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "5px", textAlign: "center" }}>No worries, just fill the form and your set</Typography>
        </>
    )
}

const ButtonSection = ({ btnText, formik }: { btnText: string, formik: any }) => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={formik.isSubmitting}
            >
                {btnText}
            </Button>
        </>
    )
}

const RenderFormSection = (progress: number, formik: any) => {
    switch (progress) {
        case 1:
            return (
                <GenerateCustTextField
                    formik={formik}
                    name='email'
                    label='Email'
                />
            );
        case 2:
            return (
                <GenerateCustTextField
                    formik={formik}
                    name='otp'
                    label='Enter the OTP'
                />
            );
        case 3:
        case 4:
            return (
                <Stack spacing={1}>
                    <PasswordTextField
                        formik={formik}
                        name='newPassword'
                        label='New Password'
                    />
                    <PasswordTextField
                        formik={formik}
                        name='retypePassword'
                        label='Retype Password'
                    />
                </Stack>
            )
        default:
            return <></>;
    }
}

const FormSection = ({ progress, formik }: { progress: number, formik: any }) => {
    return (
        <>
            <Box component="form" sx={{ mt: 2 }} onSubmit={formik.handleSubmit}>
                {RenderFormSection(progress, formik)}
                <ButtonSection btnText='NEXT' formik={formik} />
            </Box>
        </>
    )
}

const ChangePasswordSection = () => {
    const [progress, setProgress] = useState(1);
    const router = useRouter();

    const formik = useFormik<any>({
        initialValues: {
            email: '', otp: '', newPassword: '', retypePassword: ''
        },
        onSubmit: async (values: any) => {
            if (progress === 1) {
                if (values?.email !== '') {
                    const response = await apiCallNResp(() => httpGetOtp(values.email));
                    if (response.success) {
                        toast.success(response.message);
                        setProgress(2);
                    }
                }
            }
            else if (progress === 2) {
                if (values?.email !== '' && values?.otp !== '') {
                    const response2 = await apiCallNResp(() => httpVerifyOtp({ email: values.email, otp: values.otp }));
                    if (response2.success) {
                        toast.success(response2.message);
                        setProgress(3);
                    }
                }
            }
            else if (progress === 3) {

                if (values?.newPassword === values?.retypePassword && (values?.email !== '' && values?.otp !== '' && values?.newPassword !== '')) {
                    const response3 = await apiCallNResp(() => httpResetPassword({ email: values.email, otp: values.otp, newPassword: values.newPassword }))
                    if (response3.success) {
                        toast.success(response3.message);
                        setProgress(4);
                        setTimeout(() => {
                            formik.resetForm();
                            router.push('/Auth/Login');
                        }, 200);
                    }
                } else {
                    toast.error("Passwords doesn't match");
                }
            }
        }
    });

    const genProgress = () => {
        switch (progress) {
            case 1:
                return "Email Address";
            case 2:
                return "OTP";
            case 3:
            case 4:
                return "Reset";
            default:
                return "";
        }
    }
    return (
        <Box sx={{ maxWidth: "500px", width: "100%", padding: "30px", borderRadius: "5px", background: "white" }}>
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <HeadSection subText={genProgress()} />
                </Box>
                {/* Head Section */}

                {/* Progress Section */}
                <Box sx={{ width: '100%', marginTop: "16px" }}>
                    <LinearProgress color="secondary" variant="determinate" value={progress * 25} />
                </Box>
                {/* Progress Section */}


                {/* Form Section */}
                <Box sx={{ width: '100%' }}>
                    <FormSection progress={progress} formik={formik} />
                </Box>
                {/* Form Section */}
            </Stack>

            <Copyright />
        </Box>
    );
}

const ForgotPasswordPage = () => {
    return (
        <LoginSignupLayout type="login">
            <ChangePasswordSection />
        </LoginSignupLayout>
    )
}

export default ForgotPasswordPage;