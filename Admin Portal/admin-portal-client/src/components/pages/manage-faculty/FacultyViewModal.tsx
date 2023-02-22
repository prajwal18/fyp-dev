import Lottie from 'lottie-react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box,
    Typography, Stack
} from '@mui/material';

import facultyLottie from "../../../assets/lottie/faculty-lottie.json";


const FacultyContent = ({ data }: { data: any }) => {
    return (
        <DialogContent sx={{ padding: "30px" }}>
            <Typography variant='h6' component='h5' mb={2}>Faculty Information</Typography>
            <Stack direction='row' sx={{ minWidth: "500px", gap: "50px" }}>
                <Box sx={{width:"250px"}}>
                    <Lottie animationData={facultyLottie}/>
                </Box>
                <Stack spacing={1}>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Name:</Typography>
                        <Typography>{data.name}</Typography>
                    </Stack>
                    
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Created At:</Typography>
                        <Typography>{new Date(data.createdAt).toDateString()}</Typography>
                    </Stack>

                    <Stack direction='row' spacing={2} sx={{paddingTop:"20px"}}>
                        <Typography sx={{ fontWeight: "700" }}>Total Courses:</Typography>
                        <Typography>{data.totalCourses}</Typography>
                    </Stack>
                    <Stack spacing={2} mt={2} sx={{ padding: "10px", border: "1px solid grey", borderRadius: "5px" }}>
                        <Typography>Computing</Typography>
                        <Typography>Networking</Typography>
                        <Typography>Astronomy</Typography>
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


const FacultyViewModal = ({ data, open, handleClose }: { data: any, open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="view-faculty-title"
        >
            <DialogTitle id="view-faculty-title" sx={{ fontWeight: "700" }}>
                {`Faculty Details - ${data.name}`}
            </DialogTitle>

            <FacultyContent data={data} />

            <ActionButtons
                handleDisagree={handleClose}
            />
        </Dialog>
    )
}


export default FacultyViewModal;
