import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
//MUI Components
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//MUI Components

//Login Layout
import LoginSignupLayout from '@/components/Layout/LoginSignupLayout';
import InputFileField from '@/components/Common/form/InputFileField';
//Login Layout

// Constants
import { UserRoleDD } from '@/constants/DropDownOptions';
import { InitialValues, SignUpScheama } from './formikUtils';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUserRegistration } from '@/service/user.service';
import { GenerateCustTextArea, GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';
import { GenerateCustSelect } from '@/components/Common/form/CustSelect';
import PasswordTextField from '@/components/Common/form/PasswordTextField';
// Constants

const FormSectionHeader = ({ children }: { children: string }) => {
    return <Typography sx={{ display: "block", fontSize: "20px", color: "#6B6B6B" }}>
        {children}
    </Typography>
}

const HeadSection = () => {
    return (
        <>
            <Typography component="h1" variant="h4">
                Sign Up
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "5px", textAlign: "center" }}>Join us and be part of a growing community</Typography>
        </>
    )
}

const ButtonSection = ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
            >
                Sign up
            </Button>
            <Stack spacing={2} direction="row">
                <Link href="/Auth/Login" variant="body2">
                    Already have an account? Log in
                </Link>
            </Stack>
        </>
    )
}

//Form Sub Sections ------------------------------------------------------------------------------------------
const LocationAndAbout = ({ formik }: { formik: any }) => {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <FormSectionHeader>Location</FormSectionHeader>
                <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                    <Grid item xs={12} md={6}>
                        <GenerateCustTextField
                            formik={formik}
                            name='zipcode'
                            label='Zip Code'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GenerateCustTextField
                            formik={formik}
                            name='address'
                            label='Address'
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: "100%" }}>
                <FormSectionHeader>About Yourself</FormSectionHeader>
                <GenerateCustTextArea
                    formik={formik} name='aboutMe' label='About yourself...'
                    rows={3}
                />
            </Box>
        </>
    )
}
const ContactSection = ({ formik }: { formik: any }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <FormSectionHeader>Contact</FormSectionHeader>
            <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                <Grid item xs={12} md={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='email'
                        label='Email Address'
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='contact'
                        label='Contact'
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
const NameAndRole = ({ formik }: { formik: any }) => {
    return (
        <Box>
            <FormSectionHeader>Name and User Role</FormSectionHeader>
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                <Grid item xs={12}>
                    <GenerateCustTextField
                        formik={formik}
                        name='name'
                        label='Name'
                    />
                </Grid>
                <Grid item xs={12}>
                    <GenerateCustSelect
                        formik={formik}
                        name='role'
                        label='User Role'
                        id='select-user-role'
                        options={UserRoleDD}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PasswordTextField
                        formik={formik}
                        name='password'
                        label='Password'
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
const TopSection = ({ formik }: { formik: any }) => {
    const handleSetImage = (image: string) => {
        formik.setFieldValue('profilePicture', image);
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Box>
                    <FormSectionHeader>Profile Picture</FormSectionHeader>
                    <Stack direction={"row"} sx={{ justifyContent: "center", marginTop: "15px" }}>
                        <InputFileField
                            image={formik.values.profilePicture}
                            setImage={handleSetImage}
                            dimension={{ height: 180, width: 180 }}
                            id="sign-up-profile-image"
                        />
                    </Stack>
                </Box>
                {/* Profile Picture Upload Goes here */}
            </Grid>
            <Grid item xs={12} md={6}>
                <NameAndRole formik={formik} />
            </Grid>
        </Grid>
    )
}
//Form Sub Sections ------------------------------------------------------------------------------------------

export const FormSection = ({ formik }: { formik: any }) => {
    return (
        <Stack
            spacing={3} component="form" onSubmit={formik.handleSubmit}
            sx={{ justifyContent: "center", alignItems: "center", marginTop: "20px", width: "100%" }}
        >
            <TopSection formik={formik} />
            <ContactSection formik={formik} />
            <LocationAndAbout formik={formik} />
            <ButtonSection isSubmitting={formik.isSubmitting} />
        </Stack>
    )
}


const SignUpSection = ({ formik }: { formik: any }) => {
    return (
        <Box sx={{ maxWidth: "800px", width: "100%", padding: "20px 30px", margin: "30px 10px", borderRadius: "5px", background: "white" }}>
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <HeadSection />
                {/* Head Section */}

                {/* Form Section */}
                <FormSection formik={formik} />
                {/* Form Section */}
            </Stack>
        </Box>
    );
}

const SignUpPage = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: SignUpScheama,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            console.log(values);
            try {
                const response = await apiCallNResp(() => httpUserRegistration(values));
                if (response && response.success) {
                    toast.success(response.data.name + ' registered successfully.');
                    router.push('/Auth/Login');
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                formik.resetForm();
            }
        }
    });
    return (
        <LoginSignupLayout type="signup">
            <SignUpSection formik={formik} />
        </LoginSignupLayout>
    )
}

export default SignUpPage;