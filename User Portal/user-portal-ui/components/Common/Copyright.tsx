import { Typography } from "@mui/material";
import Link from "next/link";

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4, mb: 4 }}>
            {'Copyright '} &copy; {' '}
            <Link color="inherit" href="/">
                Homework Buddy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;