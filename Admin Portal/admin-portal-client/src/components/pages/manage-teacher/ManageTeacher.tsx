import React, { useState, useEffect } from 'react';
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
import TeacherTableContainer from './TeacherTable';
// Components
 
import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';
// Initial Value and Schema for formik
import { AddTeacherIV, TeacherSchema } from './form-validation/FormValidation';
// Initial Value and Schema for formik

// Redux operations
import { addTeacherAC, updateTeacherAC, setSearchTermAC, fetchSelectedTeacherAC, fetchPaginationDataAC } from '../../../redux/teachers/actions';
import { selectSearchTerm, selectSelectedTeacher, resetState } from '../../../redux/teachers/teachers.slice';
// Redux operations

// Modals
import StudentTeacherVM from '../../common/modal/ViewStudentTeacherModal';
import AddEditStudentTeacherModal from '../../common/modal/AddEditStudentTeacherModal';
// Modals

const ManageTeacher = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = useSelector(selectSearchTerm);
    const teacher = useSelector(selectSelectedTeacher);

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    // State to view teacher data
    const [openView, setOpenView] = useState(false);
    // State to view teacher data

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setSearchTermAC(event.target.value))
    }
    const handleShow = (data: any) => {
        dispatch(fetchSelectedTeacherAC(data._id));
        setOpenView(true);
    };
    const handleEdit = (data: any) => {
        setEditId(data._id);
        setIsEditing(true);
        Object.keys(AddTeacherIV).map((key: any) => {
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
        initialValues: AddTeacherIV,
        validationSchema: TeacherSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            console.log(values);
            try {
                if (isEditing) {
                    delete values.password
                    delete values.profilePicture
                    delete values.coverPicture
                    editId && dispatch(updateTeacherAC(editId, values));
                } else {
                    dispatch(addTeacherAC(values));
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
    // Reset redux state
    return (
        <>
            <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
                <Typography variant='h4' component='h2' mt={2} mb={4} >Teacher Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            label="Search Teacher"
                            variant="outlined"
                            sx={{ width: '20%' }}
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <AddBtn onClick={handleOpen}>
                            <AddIcon />
                            <Typography>New Teacher</Typography>
                        </AddBtn>
                    </Stack>

                    <TeacherTableContainer
                        handleEdit={handleEdit}
                        handleShow={handleShow}
                    />

                </BoxStyle>
            </Box>
            <AddEditStudentTeacherModal
                open={open}
                handleClose={handleClose}
                formik={formik}
                isEditing={isEditing}
            />
            {
                teacher &&
                <StudentTeacherVM
                    data={teacher}
                    open={openView}
                    handleClose={handleCloseView}
                />
            }
        </>
    )
}

export default ManageTeacher;