
import { useRouter } from "next/router";
import styled from "styled-components";
// MUI Components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// MUI Components

// MUI Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// MUI Icons

import Lottie from "lottie-react";                             // Lottie Container
import SuccessLottie from "@/public/Lottie/98741-success.json";

import LoginSignupLayout from "../Layout/LoginSignupLayout";


//Styled Components
const PageContainer = styled(Box)`
    width: 100%;
    max-width: 700px;
    background: white;
    padding: 50px 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
//Styled Components

const SignUpDoneContainer = () => {
    const router = useRouter();
    return (
        <PageContainer>
            <Lottie animationData={SuccessLottie} loop={true} style={{height: "300px"}}/>
            <Stack spacing={1} sx={{ marginTop: "30px" }}>
                <Typography variant="h4" component="h4">Sign Up Done</Typography>
                <Typography variant="body1" component="p" >
                    You have been successfully registered
                </Typography>
            </Stack>
            <Button 
            onClick={() => {
                router.push('/Auth/Login');
            }}
            sx={{display: "flex", padding:"10px 30px", color: "#A789E5", alignItems:"center", marginTop: "20px" }}>
                <ArrowBackIosIcon />
                <Typography variant="h6">Go To Login</Typography>
            </Button>
        </PageContainer>
    )
}

const SignUpDonePage = () => {
    return (
        <LoginSignupLayout type="signup">
            <SignUpDoneContainer />
        </LoginSignupLayout>
    )
}

export default SignUpDonePage;