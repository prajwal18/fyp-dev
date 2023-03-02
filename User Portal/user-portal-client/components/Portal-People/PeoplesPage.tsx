import React, { useState } from 'react';
import {
    Box, Stack, TextField,
    Typography, Button
} from "@mui/material";
//MUI Icon
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
//MUI Icon
// Custom Styled Components
import { AddBtn, BoxStyle } from '../Common/styled/StyledComponents';
import PeopleTableContainer from './PeopleTable';
import PeopleFilter from './PeopleFilter';
// Custom Styled Components

const PeoplesPage = () => {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2' mt={2} mb={4} >Members in your Courses</Typography>

                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Stack direction='row' gap={2}>
                            <TextField
                                label="Search Members"
                                variant="outlined"
                                sx={{ minWidth: '200px' }}
                            />
                            <Button color='primary' variant='outlined' onClick={() => setShowFilter(!showFilter)}>
                                <TuneIcon fontSize='large' />
                            </Button>
                        </Stack>
                        <AddBtn>
                            <AddIcon />
                            <Typography>Add Something</Typography>
                        </AddBtn>
                    </Stack>
                    {
                        showFilter && <PeopleFilter />
                    }
                    <PeopleTableContainer />
                </BoxStyle>
            </Box>
        </>
    )
}

export default PeoplesPage