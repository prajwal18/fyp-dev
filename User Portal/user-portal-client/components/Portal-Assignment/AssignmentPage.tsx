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

const AssignmentPage = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [show, setShow] = useState(false); // To show and hide add/edit assignment modal
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
							/>
							<Button color='primary' variant='outlined' onClick={() => setShowFilter(!showFilter)}>
								<TuneIcon fontSize='large' />
							</Button>
						</Stack>
						<AddBtn onClick={() => setShow(true)}>
							<AddIcon />
							<Typography>Create Assignment</Typography>
						</AddBtn>
					</Stack>
					{
						showFilter && <AssignmentFilter />
					}
					<AssignmenTableContainer />
				</BoxStyle>
			</Box>
			<CreateAssignment
				open={show}
				handleClose={() => setShow(false)}
			/>
		</>
	)
}

export default AssignmentPage