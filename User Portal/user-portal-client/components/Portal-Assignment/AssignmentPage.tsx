import React, { useState, useEffect } from 'react';
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
import { selectSearchTerm, selectSelectedAssignment, updateSearchTerm } from '@/redux/assignment/assignment.slice';
import { selectUser } from '@/redux/general/general.slice';
import { useFormik } from 'formik';
import { CASchema, InitialValues } from './Sections/CreateAssignmentFormik';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpCreateAssignment, httpUpdateAssignment } from '@/service/assignment.service';
import { toast } from 'react-toastify';
import { fetchUserAC } from '@/redux/general/actions';
import { fetchAllSpecificAssignmentsAC, fetchSelectedAssignmentAC } from '@/redux/assignment/actions';
import ViewAssignmentModal from './Sections/ViewAssignmentModal';

const AssignmentPage = ({ role }: { role: UserTypes }) => {
	const [showFilter, setShowFilter] = useState(true);
	const [openCA, setOpenCA] = useState(false); // To show and hide add/edit assignment modal
	const [openVA, setOpenVA] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const searchTerm = useSelector(selectSearchTerm);
	const user = useSelector(selectUser);
	const assignmentData = useSelector(selectSelectedAssignment);
	const dispatch = useDispatch();

	const handleClose = () => {
		formik.resetForm();
		setOpenCA(false);
		setIsEditing(false);
	}
	const handleOpenCA = () => {
		setOpenCA(true);
	}
	const handleOpenAssignment = (data:any) => {
		dispatch(fetchSelectedAssignmentAC({ id: data._id }))
		setOpenVA(true);
	}
	const handleSearchTermChange = (e: any) => {
		dispatch(updateSearchTerm(e.target.value));
	}

	const handleEditAssignment = (data: any) => {
		dispatch(fetchSelectedAssignmentAC({ id: data._id }));
		setIsEditing(true);
		setOpenCA(true);
	}

	const formik = useFormik({
		initialValues: InitialValues,
		validationSchema: CASchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			try {
				if (isEditing) {
					const response = await apiCallNResp(() => httpUpdateAssignment(values, assignmentData._id))
					if (response.success) {
						toast.success(response.message);
						dispatch(fetchAllSpecificAssignmentsAC());
						handleClose();
					}
				} else {
					const response = await apiCallNResp(() => httpCreateAssignment(values));
					if (response.success) {
						toast.success(response.message);
						dispatch(fetchAllSpecificAssignmentsAC())
						handleClose();
					}
				}
			} catch (error: any) {
				toast.error(error.message);
			}
		}
	});

	useEffect(() => {
		dispatch(fetchUserAC());
	}, [dispatch]);

	useEffect(() => {
		if (user._id && !isEditing) {
			formik.setFieldValue('createdBy', user._id);
		}
	}, [user]); // Don't include formik

	useEffect(() => {
		if (isEditing && assignmentData && assignmentData._id) {
			const assignmentDataCopy = JSON.parse(JSON.stringify(assignmentData));
			assignmentDataCopy.dueDate = assignmentDataCopy.dueDate.split("T")[0];
			assignmentDataCopy.releaseDate = assignmentDataCopy.releaseDate.split("T")[0];
			assignmentDataCopy.courseId = assignmentDataCopy.courseId._id;
			Object.keys(InitialValues).map((key: string) => {
				formik.setFieldValue(key, assignmentDataCopy[key]);
			});
		}
	}, [isEditing, assignmentData]); // Don't include formik

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
					<AssignmenTableContainer
						handleOpen={handleOpenAssignment}
						handleEdit={handleEditAssignment}
					/>
				</BoxStyle>
			</Box>
			{
				role === UserTypes.TEACHER &&
				<>
					<CreateAssignment
						open={openCA}
						formik={formik}
						handleClose={handleClose}
						isEditing={isEditing}
						assignmentData={assignmentData}
					/>
					<ViewAssignmentModal
						open={openVA}
						setOpen={setOpenVA}
						assignmentData={assignmentData}
					/>
				</>
			}
		</>
	)
}

export default AssignmentPage