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
import CourseTableContainer from './CourseTable';
import AddEditCourse from './AddEditModal';
import CourseViewModal from './CourseViewModal';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';
// Initial Value and Schema for formik
import { AddCourseIV, CourseSchema } from './form-validation/FormValidation';
// Initial Value and Schema for formik

// Redux operations
import { selectSearchTerm } from '../../../redux/courses/courses.slice';
import { updateCourseAC, addCourseAC, setSearchTermAC } from '../../../redux/courses/actions';
import { fetchDDFacultiesAC } from '../../../redux/faculties/actions';
// Redux operations

const ManageCourse = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = useSelector(selectSearchTerm);

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    //Store course data to view it
    const [openView, setOpenView] = useState(false);
    const [course, setCourse] = useState<any>(null);
    //Store course data to view it

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setSearchTermAC(event.target.value))
    }
    const handleShow = (data: any) => {
        setCourse(data);
        setOpenView(true);
    };
    const handleEdit = (data: any) => {
        setEditId(data._id);
        console.log(data._id);
        setIsEditing(true);
        console.log(data);
        Object.keys(AddCourseIV).map((key: any) => {
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
        setCourse(null);
        setOpenView(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const formik = useFormik({
        initialValues: AddCourseIV,
        validationSchema: CourseSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            try {
                if (isEditing) {
                    editId && dispatch(updateCourseAC(editId, values));
                } else {
                    console.log(values);
                    dispatch(addCourseAC(values));
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                handleClose();
            }
        }
    });
    // Fetching data for drop down
    useEffect(() => {
        dispatch(fetchDDFacultiesAC());
    }, []);
    // Fetching data for drop down
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2' mt={2} mb={4}>Course Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            label="Search Course"
                            variant="outlined"
                            sx={{ width: '20%' }}
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <AddBtn onClick={handleOpen}>
                            <AddIcon />
                            <Typography>New Course</Typography>
                        </AddBtn>
                    </Stack>
                    <CourseTableContainer
                        handleShow={handleShow}
                        handleEdit={handleEdit}
                    />
                </BoxStyle>
            </Box>
            <AddEditCourse
                open={open}
                handleClose={handleClose}
                formik={formik}
                isEditing={isEditing}
            />
            {
                course && <CourseViewModal data={course} open={openView} handleClose={handleCloseView} />
            }
        </>
    )
}

export default ManageCourse;