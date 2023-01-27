import React, { useState } from 'react';
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

import {toast} from "react-toastify";

const HeadSection = ({ subText }: { subText: string }) => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "4.5rem", height: "4.5rem" }}>
                <LockIcon fontSize='large' />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot Password - {subText}
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "5px" }}>No worries, just fill the form and your set</Typography>
        </>
    )
}

const ButtonSection = ({ btnText }: { btnText: string }) => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {btnText}
            </Button>
        </>
    )
}

const RenderFormSection = (progress: number) => {
    switch (progress) {
        case 1:
            return (
                <TextField
                    margin="normal"
                    fullWidth
                    label="Enter your email" />
            );
        case 2:
            return (
                <TextField
                    margin="normal"
                    fullWidth
                    label="Enter the OTP" />
            );
        case 3:
        case 4:
            return (
                <>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="New Password" />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Re-enter Password" />
                </>
            )
        default:
            return <></>;
    }
}

const FormSection = ({ progress, setProgress }: { progress: number, setProgress: (value: any) => void }) => {
    const router = useRouter();
    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();         // Prevent the default behaviour of the form to refresh
        if(progress < 3){
            setProgress(progress + 1);
        }
        if(progress === 3){
            setProgress(4);
            toast.success("Redirecting to Login");
            setTimeout(() => {
                router.push('/Auth/Login');
            }, 1000);
        }
    }
    return (
        <>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                {RenderFormSection(progress)}
                <ButtonSection btnText='NEXT' />
            </Box>
        </>
    )
}

const ChangePasswordSection = () => {
    const [progress, setProgress] = useState(1);
    const genProgress = () => {
        switch(progress){
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
                <Box sx={{ width: '100%', display:"flex", flexDirection:"column", alignItems:"center" }}>
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
                    <FormSection progress={progress} setProgress={setProgress} />
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