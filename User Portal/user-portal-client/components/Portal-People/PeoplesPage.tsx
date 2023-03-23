import React, { useState } from 'react';
import {
    Box, Stack, TextField,
    Typography, Button
} from "@mui/material";
//MUI Icon
import TuneIcon from '@mui/icons-material/Tune';
//MUI Icon
// Custom Styled Components
import { BoxStyle } from '../Common/styled/StyledComponents';
import PeopleTableContainer from './PeopleTable';
import PeopleFilter from './PeopleFilter';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, updateSearchTerm } from '@/redux/people/people.slice';
// Custom Styled Components

const PeoplesPage = () => {
    const searchTerm = useSelector(selectSearchTerm);
    const [showFilter, setShowFilter] = useState(false);

    const dispatch = useDispatch();

    const handleSearchTermChange = (e: any) => {
        dispatch(updateSearchTerm(e.target.value));
    }
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
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                            <Button color='primary' variant='outlined' onClick={() => setShowFilter(!showFilter)}>
                                <TuneIcon fontSize='large' />
                            </Button>
                        </Stack>
                    </Stack>
                    {
                        <PeopleFilter showFilter={showFilter} />
                    }
                    <PeopleTableContainer />
                </BoxStyle>
            </Box>
        </>
    )
}

export default PeoplesPage