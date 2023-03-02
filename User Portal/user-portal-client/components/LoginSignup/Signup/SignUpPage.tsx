import React, { useState } from 'react';

//MUI Components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
//MUI Components

//Login Layout
import LoginSignupLayout from '../../Layout/LoginSignupLayout';
import InputFileField from '@/components/Common/form/InputFileField';
//Login Layout

// Constants
import { UserRoleDD } from '@/constants/DropDownOptions';
import { DDOptionT } from '@/constants/CustomTypes';
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

const ButtonSection = () => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
const LocationAndAbout = () => {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <FormSectionHeader>Location</FormSectionHeader>
                <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Zip Code" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Address" />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ width: "100%" }}>
                <FormSectionHeader>About Yourself</FormSectionHeader>
                <TextField placeholder="About yourself..." sx={{ marginTop: "5px" }}
                    multiline fullWidth rows={3} />
            </Box>
        </>
    )
}
const ContactSection = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <FormSectionHeader>Contact</FormSectionHeader>
            <Grid container spacing={1} sx={{ marginTop: "5px" }}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email Address" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone No" />
                </Grid>
            </Grid>
        </Box>
    )
}
const NameAndRole = () => {
    return (
        <Box>
            <FormSectionHeader>Name and User Role</FormSectionHeader>
            <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name" />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="select-user-role">User Role</InputLabel>
                        <Select
                            labelId="select-user-role"
                            label="User Role"
                        >
                            {
                                UserRoleDD.map((item:DDOptionT, index:number) => (
                                    <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}
const TopSection = () => {
    const [image, setImage] = useState("");
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <Box>
                    <FormSectionHeader>Profile Picture</FormSectionHeader>
                    <Stack direction={"row"} sx={{ justifyContent: "center", marginTop: "15px" }}>
                        <InputFileField image={image} setImage={setImage} dimension={{ height: 180, width: 180 }} id="sign-up-profile-image" />
                    </Stack>
                </Box>
                {/* Profile Picture Upload Goes here */}
            </Grid>
            <Grid item xs={12} md={6}>
                <NameAndRole />
            </Grid>
        </Grid>
    )
}
//Form Sub Sections ------------------------------------------------------------------------------------------

const FormSection = () => {
    return (
        <Stack spacing={3} sx={{ justifyContent: "center", alignItems: "center", marginTop: "20px", width: "100%" }}>
            <TopSection />
            <ContactSection />
            <LocationAndAbout />
            <ButtonSection />
        </Stack>
    )
}


const SignUpSection = () => {
    return (
        <Box sx={{ maxWidth: "800px", width: "100%", padding: "20px 30px", margin: "30px 10px", borderRadius: "5px", background: "white" }}>
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <HeadSection />
                {/* Head Section */}

                {/* Form Section */}
                <FormSection />
                {/* Form Section */}
            </Stack>
        </Box>
    );
}

const SignUpPage = () => {
    return (
        <LoginSignupLayout type="signup">
            <SignUpSection />
        </LoginSignupLayout>
    )
}

export default SignUpPage;