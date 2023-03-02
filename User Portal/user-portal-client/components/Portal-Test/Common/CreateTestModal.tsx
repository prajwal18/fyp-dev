import React from 'react';
import {
    Box, Dialog, DialogTitle,
    Button, TextField, FormControl,
    InputLabel, Select, MenuItem,
    Stack, Typography
} from '@mui/material';
import { useRouter } from 'next/router';


const FormComponent = () => {
    return (
        <>
            <Typography sx={{ fontSize: "18px", mb: 1 }}>General Infomation About The Test</Typography>
            <Stack spacing={3} mb={2}>
                <TextField label="Test Title" fullWidth />
                <TextField label="Test Sub-title" fullWidth />
                {/* Filter by Course */}
                <FormControl fullWidth>
                    <InputLabel id="select-course-label">Course</InputLabel>
                    <Select
                        labelId="select-course-label"
                        id="select-course"
                        label="Course"
                    >
                        <MenuItem value={10}>Science</MenuItem>
                        <MenuItem value={20}>Math</MenuItem>
                        <MenuItem value={30}>Physics</MenuItem>
                        <MenuItem value={30}>Chemistry</MenuItem>
                    </Select>
                </FormControl>
                {/* Filter by Course */}
                <TextField type="date" focused label="Release Date" fullWidth />
                <TextField type="text" label="Full Marks" fullWidth />
                <Button type="submit" variant='contained'>Proceed</Button>
            </Stack>
        </>
    );
}

const CreateTestModal = ({ open, handleClose }: { open: boolean, handleClose: (value: any) => void }) => {
    const { push } = useRouter();
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        push("/Student/CreateTest");
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="Create-edit-test-head-data"
        >
            <DialogTitle id="Create-edit-test-head-data" sx={{ fontSize: "24px" }}>
                Create New Test
            </DialogTitle>
            <Box component={'form'} onSubmit={handleSubmit} sx={{ padding: "10px 30px", minWidth: "400px" }}>
                <FormComponent />
            </Box>
        </Dialog>
    );
}

export default CreateTestModal;