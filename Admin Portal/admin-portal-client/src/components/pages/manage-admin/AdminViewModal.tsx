import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box,
    Typography, Stack
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

// MUI ICONS
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// MUI ICONS

import { baseURL } from '../../../utils/endpoints';
import profilePic from "../../../assets/images/profilePic.png";
import PasswordTextField from '../../common/form/PasswordTextField';

import { changeAdminPWAC } from '../../../redux/admins/actions';


// Initial Values and Schema for formik
const CPIV = { newPassword: '' };
const CPSchema = yup.object().shape({
    newPassword: yup.string().min(5, 'Password needs to be longer than 5 characters.').required('New Password is required')
});
// Initial Values and Schema for formik



const ChangePasswordSection = ({ id }: { id: string }) => {
    const [showCP, setShowCP] = useState(false); // Show change password
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: CPIV,
        validationSchema: CPSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            dispatch(changeAdminPWAC(id, values));
            formik.resetForm();
        }
    })
    return (
        <Box>
            <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' component='h5' my={2}>Change Password</Typography>
                {
                    <Button
                        color='info'
                        onClick={() => setShowCP(!showCP)}
                    >
                        {
                            showCP ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
                        }
                    </Button>
                }
            </Stack>
            {
                showCP &&
                <Stack direction='row' spacing={3} mt={2} component="form" alignItems='center' onSubmit={formik.handleSubmit} sx={{}}>
                    <PasswordTextField
                        formik={formik}
                        name='newPassword'
                        label='New Password'
                    />
                    <Button variant='contained'
                        onClick={() => { }}
                        type='submit'
                        disabled={formik.isSubmitting}
                    >Change</Button>
                </Stack>
            }
        </Box>
    )
}

const AdminContent = ({ data }: { data: any }) => {
    return (
        <DialogContent sx={{ padding: "30px" }}>
            <Typography variant='h6' component='h5' mb={2}>Personal Information</Typography>
            <Stack direction='row' sx={{ minWidth: "500px", gap: "50px" }}>
                <img
                    src={baseURL + data.profilePicture}
                    alt={'profile'}
                    style={{ height: "180px", width: "180px", objectFit: "cover" }}
                    onError={(e: any) => {
                        e.target.src = profilePic;
                        e.target.onError = null;
                    }}
                />
                <Stack spacing={1}>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Name:</Typography>
                        <Typography>{data.name}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Email:</Typography>
                        <Typography>{data.email}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Contact:</Typography>
                        <Typography>{data.contact}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Created At:</Typography>
                        <Typography>{new Date(data.createdAt).toDateString()}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Updated At:</Typography>
                        <Typography>{new Date(data.updatedAt).toDateString()}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <ChangePasswordSection id={data._id} />
        </DialogContent>
    );
}

const AddAdminActionButton = ({ handleDisagree }: { handleDisagree: () => void }) => {
    return (
        <DialogActions sx={{ padding: "20px", display: "flex", gap: "20px" }}>
            <Button onClick={handleDisagree} color="error" variant='outlined'>Close</Button>
        </DialogActions>
    );
}


const AdminViewModal = ({ data, open, handleClose }: { data: any, open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="view-admin-title"
        >
            <DialogTitle id="view-admin-title" sx={{ fontWeight: "700" }}>
                {`Admin Details - ${data.name}`}
            </DialogTitle>
            <AdminContent data={data} />
            <AddAdminActionButton
                handleDisagree={handleClose}
            />
        </Dialog>
    )
}


export default AdminViewModal;
