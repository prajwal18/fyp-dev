import React from 'react';
import { Box, Stack,TextField } from "@mui/material";
import DashLayout from '../Layout/DashLayout/DashLayout';
import { CustTypography } from '../Common/ContainersNButtons';
import { SelectSubject } from '../Common/SelectSubject';

const CreateAssignmentContainer = () => {
    return (
        <Box sx={{ padding: "30px 20px", background: "white", width: "100%" }}>
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Create New Assignment</CustTypography>
            <Stack sx={{mt:3, maxWidth:"600px"}} spacing={2}>
                <SelectSubject/>
                <TextField label="Assignment Title" variant="outlined" />
                <TextField label="Due Date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                <TextField label="Total Weightage (in %)" variant="outlined" type="number" />
                <TextField label="Description" variant="outlined" multiline rows={3} />
                <TextField label="Upload Manual" type="file" variant='outlined' InputLabelProps={{ shrink: true }} />
            </Stack>
        </Box>
    );
}


const CreateAssignment = () => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <CreateAssignmentContainer />
            </Box>
        </DashLayout>
    )
}

export default CreateAssignment;