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
import FacultyTableContainer from './FacultyTable';
import AddEditFaculty from './AddEditModal';
import FacultyViewModal from './FacultyViewModal';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';
// Initial Value and Schema for formik
import { AddFacultyIV, FacultySchema } from './form-validation/FormValidation';
// Initial Value and Schema for formik

// Redux operations
import { selectSearchTerm } from '../../../redux/faculties/faculties.slice';
import { updateFacultyAC, addFacultyAC, setSearchTermAC } from '../../../redux/faculties/actions';
// Redux operations


const ManageFaculty = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = useSelector(selectSearchTerm);

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    //Store faculty data to view it
    const [openView, setOpenView] = useState(false);
    const [faculty, setFaculty] = useState<any>(null);
    //Store faculty data to view it

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setSearchTermAC(event.target.value))
    }
    const handleShow = (data: any) => {
        setFaculty(data);
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
        setFaculty(null);
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
                    <FacultyTableContainer
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