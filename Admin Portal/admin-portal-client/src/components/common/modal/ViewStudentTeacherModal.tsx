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

// Importing user type
import { UserTypes } from '../../../constants/Constants';
// Importing user type

import { userBaseURL } from '../../../utils/endpoints';
import profilePic from "../../../assets/images/profilePic.png";
import PasswordTextField from '../../common/form/PasswordTextField';

import { changeStudentPWAC } from '../../../redux/students/actions';
import { changeTeacherPWAC } from '../../../redux/teachers/actions';
import { CustImage } from '../../../constants/FillerImg';


// Initial Values and Schema for formik
const CPIV = { newPassword: '' };
const CPSchema = yup.object().shape({
    newPassword: yup.string().min(5, 'Password needs to be longer than 5 characters.').required('New Password is required')
});
// Initial Values and Schema for formik



const ChangePasswordSection = ({ role, id }: { role: string, id: string }) => {
    const [showCP, setShowCP] = useState(false); // Show change password
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: CPIV,
        validationSchema: CPSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            switch (role) {
                case UserTypes.STUDENT:
                    dispatch(changeStudentPWAC(id, values));
                    break;
                case UserTypes.TEACHER:
                    dispatch(changeTeacherPWAC(id, values));
                    break;
                default:
                    break;
            }
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

const ContentSection = ({ data }: { data: any }) => {
    return (
        <DialogContent sx={{ padding: "30px" }}>
            <Typography variant='h6' component='h5' mb={2}>Personal Information</Typography>
            <Stack direction='row' sx={{ minWidth: "600px", gap: "50px" }}>
                <CustImage
                    src={userBaseURL + (data?.profilePicture || '/abc.jpb')}
                    alt="Profile"
                    style={{ height: "180px", width: "180px", objectFit: "cover" }}
                />
                <Stack sx={{ gap: "5px" }}>
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
                        <Typography sx={{ fontWeight: "700" }}>Address:</Typography>
                        <Typography>{data.address}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Zip-Code:</Typography>
                        <Typography>{data.zipcode}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography sx={{ fontWeight: "700" }}>Created At:</Typography>
                        <Typography>{new Date(data.createdAt).toDateString()}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction='row' spacing={2} mt={2} sx={{ padding: "10px", border: "1px solid grey", borderRadius: "5px" }}>
                <Typography sx={{ fontWeight: "700" }}>
                    About Me:
                    <Typography component={'span'} sx={{ paddingLeft: "20px" }}>
                        {data.aboutMe}
                    </Typography>
                </Typography>
            </Stack>
            <ChangePasswordSection id={data._id} role={data.role} />
        </DialogContent>
    );
}

const ActionButton = ({ handleDisagree }: { handleDisagree: () => void }) => {
    return (
        <DialogActions sx={{ padding: "20px", display: "flex", gap: "20px" }}>
            <Button onClick={handleDisagree} color="error" variant='outlined'>Close</Button>
        </DialogActions>
    );
}


const StudentTeacherVM = ({ data, open, handleClose }: { data: any, open: boolean, handleClose: () => void }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby={`view-${data.role}-title`}
        >
            <DialogTitle
                id={`view-${data.role}-title`}
                sx={{ fontWeight: "700" }}
            >
                {`${data.role} Details - ${data.name}`}
            </DialogTitle>
            <ContentSection data={data} />
            <ActionButton
                handleDisagree={handleClose}
            />
        </Dialog>
    )
}


export default StudentTeacherVM;
