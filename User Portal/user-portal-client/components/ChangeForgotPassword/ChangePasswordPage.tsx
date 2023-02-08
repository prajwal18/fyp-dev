import * as React from 'react';
import LoginSignupLayout from "../Layout/LoginSignupLayout";        // The layout that will be used

//MUI Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../Common/Copyright';
//MUI Components

//MUI Icon
import LockIcon from '@mui/icons-material/Lock';
//MUI Icon

const HeadSection = () => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "4.5rem", height: "4.5rem" }}>
                <LockIcon fontSize='large' />
            </Avatar>
            <Typography component="h1" variant="h5">
                Change Password
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "10px", textAlign: "center" }}>Use special characters for a stronger password</Typography>
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
                CHANGE
            </Button>
        </>
    )
}

const FormSection = () => {
    return (
        <>
            <Box component="form" sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Re-enter Password"
                    type="password"
                />
                <ButtonSection />
            </Box>
        </>
    )
}

const ChangePasswordSection = () => {
    return (
        <Box sx={{ maxWidth: "500px", padding: "30px", borderRadius: "5px", background: "white" }}>
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <HeadSection />
                {/* Head Section */}

                {/* Form Section */}
                <FormSection />
                {/* Form Section */}
            </Stack>

            <Copyright />
        </Box>
    );
}


const ChangePasswordPage = () => {
    return (
        <LoginSignupLayout type="login">
            <ChangePasswordSection />
        </LoginSignupLayout>
    );
}

export default ChangePasswordPage;