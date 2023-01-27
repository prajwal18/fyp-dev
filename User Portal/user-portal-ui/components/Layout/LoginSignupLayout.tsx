// MUI Components
import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
// MUI Components

const LoginSignupLayout = ({ children, type } : { children: JSX.Element, type: string }) => {
    return (
        <Container maxWidth="xl" className={`${type}-container`}>
            <Stack 
                direction={type === "login"? "row": "row-reverse"} 
                className={`${type}-stack-container`}
            >
                <Stack direction="row" spacing={2} className="image-section">
                    <Stack direction="column" spacing={1} className="welcome-banner">
                        <Stack sx={{ textTransform: "uppercase" }} direction="row" spacing={2}>
                            <Typography variant="h4" component="h4" className="display-text">
                                Welcome To
                                <Typography variant="h4" component="span" className="purple-text display-text">{" "}Homework Buddy</Typography>
                            </Typography>
                        </Stack>
                        <Typography variant="h6" component="p" mt={1} className="caption-text">
                            Experience<Typography className="purple-text caption-text" variant="h6" component="span">{" "}education{" "}</Typography>in the new age
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" className="next-section">
                    {children}
                </Stack>
            </Stack>
        </Container>
    )
}

export default LoginSignupLayout;