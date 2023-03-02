import Lottie from 'lottie-react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box,
    Typography, Stack
} from '@mui/material';

import courseLottie from "../../../assets/lottie/course-lottie.json";


const CourseContent = ({ data }: { data: any }) => {
    return (
        <DialogContent sx={{ padding: "30px" }}>
            <Typography variant='h6' component='h5' mb={2}>Course Information</Typography>
            <Stack direction='row' sx={{ minWidth: "500px", gap: "50px" }}>
                <Box sx={{ maxWidth: "250px", width:"100%" }}>
                    <Lottie animationData={courseLottie} />
                </Box>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Name:</Typography>
                        <Typography>{data.name}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Faculty:</Typography>
                        <Typography>{data.faculty}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Created At:</Typography>
                        <Typography>{new Date(data.createdAt).toDateString()}</Typography>
                    </Stack>

                    <Stack direction='row' spacing={2} mt={2} sx={{ padding: "10px", border: "1px solid grey", borderRadius: "5px" }}>
                        <Typography sx={{ fontWeight: "700", maxWidth:"300px" }}>
                            Description:
                            <Typography component={'span'} sx={{ paddingLeft: "20px" }}>
                                {data.description}
                            </Typography>
                        </Typography>
                    </Stack>

                </Stack>
            </Stack>
        </DialogContent>
    );
}

const ActionButtons = ({ handleDisagree }: { handleDisagree: () => void }) => {
    return (
        <DialogActions sx={{ padding: "20px", display: "flex", gap: "20px" }}>
            <Button onClick={handleDisagree} color="error" variant='outlined'>Close</Button>
        </DialogActions>
    );
}


const CourseViewModal = ({ data, open, handleClose }: { data: any, open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="view-course-title"
        >
            <DialogTitle id="view-course-title" sx={{ fontWeight: "700" }}>
                {`Course Details - ${data.name}`}
            </DialogTitle>
            <CourseContent data={data} />
            <ActionButtons
                handleDisagree={handleClose}
            />
        </Dialog>
    )
}


export default CourseViewModal;
