import React, { useState } from 'react';
import {
	Box, Typography,
	Stack, TextField, Button
} from "@mui/material";
//MUI Icon
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
//MUI Icon
import { AddBtn, BoxStyle } from '../Common/styled/StyledComponents';
import TestFilter from './TestFilter';
import TestTableContainer from './TestTable';
import CreateTestModal from './Common/CreateTestModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, updateSearchTerm } from '@/redux/test/test.slice';
import { UserTypes } from '@/constants/Constants';

const TestPage = ({ role }: { role: UserTypes }) => {
	const searchTerm = useSelector(selectSearchTerm);
	const [showFilter, setShowFilter] = useState(false);
	const [openCT, setOpenCT] = useState(false);
	const dispatch = useDispatch();
	const handleOpenCT = () => {
		setOpenCT(true);
	}
	const handleSearchTermChange = (e: any) => {
		dispatch(updateSearchTerm(e.target.value));
	}
	return (
		<>
			<Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
				<Typography variant='h4' component='h2' mt={2} mb={4} >Tests</Typography>

				<BoxStyle>
					<Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
						<Stack direction='row' gap={2}>
							<TextField
								label="Search Tests"
								variant="outlined"
								sx={{ minWidth: '200px' }}
								value={searchTerm}
								onChange={handleSearchTermChange}
							/>
							<Button color='primary' variant='outlined' onClick={() => setShowFilter(!showFilter)}>
								<TuneIcon fontSize='large' />
							</Button>
						</Stack>
						{
							role === UserTypes.TEACHER &&
							<AddBtn onClick={handleOpenCT}>
								<AddIcon />
								<Typography>Create Test</Typography>
							</AddBtn>
						}
					</Stack>
					{
						<TestFilter showFilter={showFilter} />
					}
					<TestTableContainer />
				</BoxStyle>
			</Box>
			{
				role === UserTypes.TEACHER &&
				<CreateTestModal open={openCT} setOpen={setOpenCT} />
			}
		</>
	)
}

export default TestPage