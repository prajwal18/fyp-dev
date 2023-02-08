import * as React from 'react';
//MUI Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//MUI Components

//Login Layout
import LoginSignupLayout from '../Layout/LoginSignupLayout';
import Copyright from '../Common/Copyright';
//Login Layout


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

const ButtonSection = () => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel sx={{ marginLeft: "10px" }}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <ButtonSection />
            </Box>
        </>
    )
}

const LoginSection = () => {

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

const LoginPage = () => {
    return (
        <LoginSignupLayout type="login">
            <LoginSection />
        </LoginSignupLayout>
    )
}

export default LoginPage;