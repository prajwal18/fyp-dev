import React, { useEffect, useState } from 'react';
import {
    DialogActions, Button, Dialog,
    Stack, Typography, Box, Grid,
    TextField
} from '@mui/material';
import InputFileField from '../Common/form/InputFileField';
import { useFormik } from 'formik';
import { EditProfileSchema, InitialValues } from './formikUtils';
import { toast } from 'react-toastify';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUpdateUser } from '@/service/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/general/general.slice';
import { GenerateCustTextArea, GenerateCustTextField } from '../Common/form/CustTextFieldNErrorMsg';
import { baseURL } from '@/utils/endpoints';
import { fetchUserAC, updateSessionNTokenAC } from '@/redux/general/actions';

// Form Section
const FormSectionHeader = ({ children }: { children: string }) => {
    return <Typography sx={{ display: "block", fontSize: "20px", color: "#6B6B6B" }}>
        {children}
    </Typography>
}
const FormSection = ({ formik, profilePicture }: { formik: any, profilePicture: string }) => {
    const handleSetImage = (image: string) => {
        formik.setFieldValue('profilePicture', image);
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems={'center'}>
                        <Box sx={{ minWidth: "48%" }}>
                            <FormSectionHeader>Profile Picture</FormSectionHeader>
                            <Stack direction={"row"} sx={{ justifyContent: "center", marginTop: "15px" }}>
                                <InputFileField
                                    image={formik.values.profilePicture || (baseURL + profilePicture)}
                                    setImage={handleSetImage}
                                    dimension={{ height: 180, width: 180 }}
                                    id="edit-profile-image"
                                />
                            </Stack>
                        </Box>

                        <GenerateCustTextField
                            formik={formik}
                            name='name'
                            label='Name'
                        />
                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='email'
                        label='Email'
                    />
                </Grid>
                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='contact'
                        label='Contact no'
                    />
                </Grid>

                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='zipcode'
                        label='Zip Code'
                    />
                </Grid>
                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='address'
                        label='Address'
                    />
                </Grid>

                <Grid item xs={12}>
                    <GenerateCustTextArea
                        formik={formik} name='aboutMe' label='About yourself...'
                        rows={3}
                    />
                </Grid>

            </Grid>
        </Box>
    );
}
// Form Section


const HeadSection = ({ userName }: { userName: string }) => {
    return (
        <Stack direction={'row'} alignItems='center' justifyContent='space-between'>
            <Typography sx={{ color: 'rgba(0,0,0,0.5)', fontSize: "22px", fontWeight: "700" }}>Edit Profile - {userName}</Typography>
        </Stack>
    )
}

const ContentSection = ({ formik, userName, profilePicture }: { formik: any, userName: string, profilePicture: string }) => {
    return (
        <Stack spacing={4} sx={{ padding: "15px 30px", maxWidth: "700px" }}>
            <HeadSection userName={userName} />
            <FormSection formik={formik} profilePicture={profilePicture} />
        </Stack>
    )
}

const ActionButtons = ({ handleClose, handleSave }: { handleClose: () => void, handleSave: () => void }) => {
    return (
        <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
            <Button onClick={handleSave} color='warning' variant='contained'>Save</Button>
            <Button onClick={handleClose} color="error">Close</Button>
        </DialogActions>
    );
}

const EditProfileModal = ({ open, setOpen }: { open: boolean, setOpen: (value: any) => void }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: EditProfileSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            console.log(values);
            try {
                const response = await apiCallNResp(() => httpUpdateUser(values, user._id));
                if (response && response.success) {
                    toast.success(response.data.user.name + ' updated successfully.');
                    dispatch(updateSessionNTokenAC(response.data.newSession));
                    dispatch(fetchUserAC());
                    handleClose();
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    useEffect(() => {
        if (user) {
            Object.keys(InitialValues).map((key) => {
                formik.setFieldValue(key, user[key]);
            })
        }
    }, [user]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth={false}>
            <ContentSection formik={formik} userName={user?.name || ''} profilePicture={user?.profilePicture || '/abc.jpg'} />
            <ActionButtons
                handleClose={handleClose}
                handleSave={formik.handleSubmit}
            />
        </Dialog>
    )
}


export default EditProfileModal;