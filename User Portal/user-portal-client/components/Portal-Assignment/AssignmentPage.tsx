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
import AssignmenTableContainer from './AssignmentTable';
import AssignmentFilter from './AssignmentFilter';
import CreateAssignment from './Sections/CreateAssignment';
import { UserTypes } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, updateSearchTerm } from '@/redux/assignment/assignment.slice';

const AssignmentPage = ({ role }: { role: UserTypes }) => {
	const searchTerm = useSelector(selectSearchTerm);
	const [showFilter, setShowFilter] = useState(true);
	const [openCA, setOpenCA] = useState(false); // To show and hide add/edit assignment modal
	const dispatch = useDispatch();
	const handleOpenCA = () => {
		setOpenCA(true);
	}
	const handleSearchTermChange = (e: any) => {
		dispatch(updateSearchTerm(e.target.value));
	}
	return (
		<>
			<Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
				<Typography variant='h4' component='h2' mt={2} mb={4} >Assignments</Typography>

				<BoxStyle>
					<Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
						<Stack direction='row' gap={2}>
							<TextField
								label="Search Assignments"
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
							<AddBtn onClick={handleOpenCA}>
								<AddIcon />
								<Typography>Create Assignment</Typography>
							</AddBtn>
						}
					</Stack>
					{
						<AssignmentFilter showFilter={showFilter} />
					}
					<AssignmenTableContainer />
				</BoxStyle>
			</Box>
			{
				role === UserTypes.TEACHER &&
				<CreateAssignment
					open={openCA}
					setOpen={setOpenCA}
				/>
			}
		</>
	)
}

export default AssignmentPage