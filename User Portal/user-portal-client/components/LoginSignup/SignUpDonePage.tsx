
import { useRouter } from "next/router";
// MUI Components
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// MUI Components

// MUI Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// MUI Icons

import Lottie from "lottie-react";                             // Lottie Container
import SuccessLottie from "@/public/Lottie/98741-success.json";

import LoginSignupLayout from "../Layout/LoginSignupLayout";


const SignUpDoneContainer = () => {
    const router = useRouter();
    return (
        <Stack sx={{width: "100%", maxWidth: "700px", background: "white", padding: "50px 20px", borderRadius: "5px", textAlign: "center"}}>
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
        </Stack>
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