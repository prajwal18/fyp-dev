import { useRouter } from 'next/router';
import {
    Stack, Button, Container,
    Typography, Grid, Box
} from '@mui/material';
import Lottie from "lottie-react";
import errorLottie from "@/public/Lottie/error-lottie.json";
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/general/general.slice';  

const PageNotFound = () => {
    const user = useSelector(selectUser);
    const router = useRouter();

    return (
        <Stack direction="row"
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container>
                    <Grid item xs={6}>
                        <Box sx={{
                            display: "flex", flexDirection: "column",
                            justifyContent: "center", paddingRight: "100px"
                        }}>
                            <Typography variant="h1" component="h1">
                                404
                            </Typography>
                            <Typography variant="h6" mb={2} component="h6">
                                The page you’re looking for doesn’t exist.
                            </Typography    >
                            <Stack direction='row' spacing={2}>
                                <Button
                                    sx={{ maxWidth: "150px" }}
                                    variant="contained"
                                    onClick={router.back}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    sx={{ maxWidth: "150px" }}
                                    variant="contained"
                                    onClick={() => router.push(user?.role ? `/${user.role}/Dashboard`: '/Auth/Login')}
                                >
                                    Go To Home
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Lottie animationData={errorLottie} loop={true} />
                    </Grid>
                </Grid>
            </Container>
        </Stack>
    );
}

export default PageNotFound;