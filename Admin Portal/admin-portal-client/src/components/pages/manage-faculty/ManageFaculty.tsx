import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
    Box, Typography, Stack, TextField
} from "@mui/material";
//MUI Icon
import AddIcon from '@mui/icons-material/Add';
//MUI Icon

// Components
import FacultyTablesSection from './FacultyTablesSection';
import AddEditFaculty from './AddEditModal';
import FacultyViewModal from './FacultyViewModal';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';
// Initial Value and Schema for formik
import { AddFacultyIV, FacultySchema } from './form-validation/FormValidation';
// Initial Value and Schema for formik

// Redux operations
import {
    selectSearchTerm,
    selectSelectedFaculty,
    resetState
} from '../../../redux/faculties/faculties.slice';
import {
    updateFacultyAC, addFacultyAC,
    setSearchTermAC, fetchSelectedFaculty,
    fetchPaginationDataAC
} from '../../../redux/faculties/actions';
import { fetchFacultyCoursePaginationAC } from '../../../redux/courses/actions';
// Redux operations


const ManageFaculty = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = useSelector(selectSearchTerm);
    const faculty = useSelector(selectSelectedFaculty);

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    // State to view faculty data
    const [openView, setOpenView] = useState(false);
    // State to view faculty data

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setSearchTermAC(event.target.value));
    }
    const handleShow = (data: any) => {
        console.log('Data Faculty: ', data);
        setOpenView(true);
    };
    const handleEdit = (data: any) => {
        setEditId(data._id);
        setIsEditing(true);
        Object.keys(AddFacultyIV).map((key: any) => {
            formik.setFieldValue(key, data[key]);
        });
        setOpen(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        formik.resetForm();
        setOpen(false);
    }
    const handleCloseView = () => {
        setOpenView(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const formik = useFormik({
        initialValues: AddFacultyIV,
        validationSchema: FacultySchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            try {
                if (isEditing) {
                    editId && dispatch(updateFacultyAC(editId, values));
                } else {
                    console.log(values);
                    dispatch(addFacultyAC(values));
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                handleClose();
            }
        }
    });
    // Reset redux state
    useEffect(() => {
        dispatch(resetState());
        dispatch(fetchPaginationDataAC());
    }, []);
    useEffect(() => {
        if(faculty){
            dispatch(fetchFacultyCoursePaginationAC());
        }
    }, [faculty]);
    // Reset redux state
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2' mt={2} mb={4} >Faculty Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            label="Search Faculty"
                            variant="outlined"
                            sx={{ width: '20%' }}
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <AddBtn onClick={handleOpen}>
                            <AddIcon />
                            <Typography>New Faculty</Typography>
                        </AddBtn>
                    </Stack>
                    <FacultyTablesSection
                        handleShow={handleShow}
                        handleEdit={handleEdit}
                    />
                </BoxStyle>
            </Box>
            <AddEditFaculty
                open={open}
                handleClose={handleClose}
                formik={formik}
                isEditing={isEditing}
            />
            {
                faculty && <FacultyViewModal data={faculty} open={openView} handleClose={handleCloseView} />
            }
        </>
    )
}

export default ManageFaculty;