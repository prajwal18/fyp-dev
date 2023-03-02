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

const TestPage = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [openCT, setOpenCT] = useState(false);
	const handleOpenCT = () => {
		setOpenCT(true);
	}
	const handleCloseCT = () => {
		setOpenCT(false);
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
							/>
							<Button color='primary' variant='outlined' onClick={() => setShowFilter(!showFilter)}>
								<TuneIcon fontSize='large' />
							</Button>
						</Stack>
						<AddBtn onClick={handleOpenCT}>
							<AddIcon />
							<Typography>Create Test</Typography>
						</AddBtn>
					</Stack>
					{
						showFilter && <TestFilter />
					}
					<TestTableContainer />
				</BoxStyle>
			</Box>
			<CreateTestModal open={openCT} handleClose={handleCloseCT} />
		</>
	)
}

export default TestPage