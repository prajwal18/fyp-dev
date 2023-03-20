import * as React from 'react';

//MUI Components
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions } from '@mui/material';
//MUI Components

//MUI Icon
import LockIcon from '@mui/icons-material/Lock';
import { useFormik } from 'formik';
import { ChangePasswordSchema, InitialValues } from './formikUtils';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpChangeUserPassword } from '@/service/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/general/general.slice';
import { removeSessionNTokenAC } from '@/redux/general/actions';
import { useRouter } from 'next/router';
import { GenerateCustTextField } from '../Common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '../Common/form/PasswordTextField';
//MUI Icon

const HeadSection = () => {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: "4.5rem", height: "4.5rem" }}>
                <LockIcon fontSize='large' />
            </Avatar>
            <Typography component="h1" variant="h5">
                Change Password
            </Typography>
            <Typography component="div" variant="h6" sx={{ fontSize: "0.9rem", color: "rgba(0,0,0,0.7)", marginTop: "10px", textAlign: "center" }}>Use special characters for a stronger password</Typography>
        </>
    )
}

const ButtonSection = () => {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                CHANGE
            </Button>
        </>
    )
}

const FormSection = ({ formik }: { formik: any }) => {
    return (
        <>
            <Stack sx={{ mt: 3, width:"400px"}} spacing={2}>
                <PasswordTextField
                    name='oldPassword'
                    formik={formik}
                    label='Old Password'
                />
                <PasswordTextField
                    name='newPassword'
                    formik={formik}
                    label='New Password'
                />
                <PasswordTextField
                    name='confirmPassword'
                    formik={formik}
                    label='Confirm Password'
                />
                <ButtonSection />
            </Stack>
        </>
    )
}

const ChangePasswordSection = ({ formik }: { formik: any }) => {
    return (
        <Box
            sx={{ padding: "20px 30px", borderRadius: "5px", background: "white" }}
            component='form'
            onSubmit={formik.handleSubmit}
        >
            <Stack sx={{ alignItems: 'center' }}>
                {/* Head Section */}
                <HeadSection />
                {/* Head Section */}

                {/* Form Section */}
                <FormSection formik={formik} />
                {/* Form Section */}
            </Stack>
        </Box>
    );
}


const ChangePasswordModal = ({ open, setOpen }: { open: boolean, setOpen: (value: any) => void }) => {
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    }
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: ChangePasswordSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const response = await apiCallNResp(() => httpChangeUserPassword(values, user._id));
                if (response && response.success) {
                    toast.success('Successfully changed password.');
                    handleClose();
                    dispatch(removeSessionNTokenAC());
                    router.push('/Auth/Login');
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={false}>
                <ChangePasswordSection formik={formik} />
                <DialogActions>
                    <Button onClick={handleClose} color="error">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ChangePasswordModal;