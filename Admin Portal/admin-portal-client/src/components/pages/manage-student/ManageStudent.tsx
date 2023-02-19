import React from 'react';
import {
    Box, Typography, Stack, TextField
} from "@mui/material";

//MUI Icon
import AddIcon from '@mui/icons-material/Add';
//MUI Icon

// Components
import StudentTable from './StudentTable';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';

const ManageStudent = () => {
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2'mt={2} mb={4} >Student Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField label="Search Student" variant="outlined" sx={{ width: '20%' }} />
                        <AddBtn onClick={() => { }}>
                            <AddIcon />
                            <Typography>New Student</Typography>
                        </AddBtn>
                    </Stack>
                    <StudentTable/>
                </BoxStyle>
            </Box>
            {/* Add/Edit Student Modal */}
            {/* Change Student password table */}
        </>
    )
}

export default ManageStudent;