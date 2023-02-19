import React from 'react';
import {
    Box, Typography, Stack, TextField
} from "@mui/material";

//MUI Icon
import AddIcon from '@mui/icons-material/Add';
//MUI Icon

// Components
import FacultyTableSection from './FacultyTable';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';


const ManageFaculty = () => {
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2' mt={2} mb={4} >Faculty Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField label="Search Faculty" variant="outlined" sx={{ width: '20%' }} />
                        <AddBtn onClick={() => { }}>
                            <AddIcon />
                            <Typography>New Faculty</Typography>
                        </AddBtn>
                    </Stack>
                    <FacultyTableSection/>
                </BoxStyle>
            </Box>
            {/* Add/Edit Faculty Modal */}
        </>
    )
}

export default ManageFaculty;