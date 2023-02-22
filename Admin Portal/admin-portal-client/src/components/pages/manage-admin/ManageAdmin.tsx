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
import AdminTableContainer from './AdminTable';
import AddEditAdminModal from './AddEditModal';
// Components

import { BoxStyle, AddBtn } from '../../common/styled/StyledComponents';
// Initial Value and Schema for formik
import { AddAdminIV, AdminSchema } from './form-validation/FormValidation';
// Initial Value and Schema for formik

// Redux operations
import { addAdminAC, updateAdminAC, setSearchTermAC } from '../../../redux/admins/actions';
import { selectSearchTerm } from '../../../redux/admins/admins.slice';
// Redux operations
import AdminViewModal from './AdminViewModal';


const ManageAdmin = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = useSelector(selectSearchTerm);

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    //Store admin data to view it
    const [openView, setOpenView] = useState(false);
    const [admin, setAdmin] = useState<any>(null);
    //Store admin data to view it

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setSearchTermAC(event.target.value))
    }
    const handleShow = (data: any) => {
        setAdmin(data);
        setOpenView(true);
    };
    const handleEdit = (data: any) => {
        setEditId(data._id);
        console.log(data._id);
        setIsEditing(true);
        console.log(data);
        Object.keys(AddAdminIV).map((key: any) => {
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
        setAdmin(null);
        setOpenView(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const formik = useFormik({
        initialValues: AddAdminIV,
        validationSchema: AdminSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            try {
                if (isEditing) {
                    delete values.password
                    if (values.profilePicture) {
                        if (!values.profilePicture.includes('data:image/')) {
                            delete values.profilePicture
                        }
                    }
                    editId && dispatch(updateAdminAC(editId, values));
                } else {
                    console.log(values);
                    dispatch(addAdminAC(values));
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
                <Typography variant='h4' component='h2' mt={2} mb={4} >Admin Management</Typography>
                <BoxStyle>
                    <Stack direction="row" mb={3} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                        <TextField
                            label="Search Admin"
                            variant="outlined"
                            sx={{ width: '20%' }}
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                        <AddBtn onClick={handleOpen}>
                            <AddIcon />
                            <Typography>New Admin</Typography>
                        </AddBtn>
                    </Stack>
                    <AdminTableContainer
                        handleShow={handleShow}
                        handleEdit={handleEdit}
                    />
                </BoxStyle>
            </Box>
            <AddEditAdminModal
                open={open}
                handleClose={handleClose}
                formik={formik}
                isEditing={isEditing}
            />
            {admin && <AdminViewModal data={admin} open={openView} handleClose={handleCloseView} />}
        </>
    )
}

export default ManageAdmin;