import React from 'react';
import Image from 'next/image';
import {
    Box, Dialog, DialogTitle,
    Grid, TextField, FormControl,
    InputLabel, Select, MenuItem,
    Stack, Button
} from '@mui/material';


// Delete this later
import fillerImg from '@/public/Images/filler.png';
// Delete this later

const FormComponent = () => {
    return (
        <Box>
            <Grid container spacing={4} mb={4}>
                <Grid item xs={7}>
                    <Stack gap={2}>
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
                        <TextField label='Assignment Title' fullWidth />
                        <TextField label='Due Date' type="date" fullWidth focused />
                        <TextField label='Total Marks' fullWidth />
                        <TextField label='Description' fullWidth />
                        <TextField label='Upload Pdf' type="file" fullWidth focused />
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Stack>
                </Grid>
                <Grid item xs={5}>
                    <Stack direction='row' alignItems='center' sx={{ border:'2px dashed rgba(0,0,0,0.2)', padding:"10px" }}>
                        <Image
                            src={fillerImg}
                            alt="Filler" style={{ objectFit: "cover", width: "100%", maxHeight: "400px" }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

const CreateAssignment = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="add-edit-assignment"
        >
            <DialogTitle id="add-edit-assignment">
                Create New Assignment
            </DialogTitle>
            <Box component='form' onSubmit={() => { }} style={{ padding: "20px 40px", minWidth: "700px" }}>
                <FormComponent />
            </Box>
        </Dialog>
    )
}

export default CreateAssignment;