import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import errorLottie from "../../../assets/lottie/error-lottie.json";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container>
                    <Grid item xs={6} sx={{
                        display: "flex", flexDirection: "column",
                        justifyContent: "center",
                        paddingRidht: "100px !important"
                    }}>
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6" mb={2}>
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button
                            sx={{ maxWidth: "150px" }}
                            variant="contained"
                            onClick={() => { navigate("/admin/") }}
                        >
                            Go Back Home
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Lottie animationData={errorLottie} loop={true} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default PageNotFound;