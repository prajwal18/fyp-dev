import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Box, Stack
} from '@mui/material';

// Custom Text fields
import { GenerateCustTextField } from '../../common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '../../common/form/PasswordTextField';
import InputFileField from '../../common/form/InputFileField';
// Custom Text fields

const AddAdminContent = ({ formik }: { formik: any }) => {
    const setProfileImg = (value: any) => {
        if (value) {
            formik.setFieldValue('profilePicture', value);
        }
    }
    return (
        <DialogContent sx={{ padding: "20px 30px" }}>
            <Stack spacing={3} sx={{ minWidth: "550px" }}>
                <Stack spacing={2} direction={'row'}>
                    <Stack direction={'row'} sx={{ width: "100%" }}>
                        <InputFileField image={formik.values.profilePicture} setImage={setProfileImg} dimension={{ height: 180, width: 180 }} id='admin-profile-pic' />
                    </Stack>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Box></Box>
                        <GenerateCustTextField label='Email' name="email" formik={formik} />
                        <PasswordTextField label='Password' name="password" formik={formik} />
                    </Stack>
                </Stack>

                <Stack spacing={2} direction={'row'}>
                    <GenerateCustTextField label='Name' name="name" formik={formik} />
                    <GenerateCustTextField label='Contact' name="contact" formik={formik} />
                </Stack>
            </Stack>
        </DialogContent>
    );
}

const UpdateAdminContent = ({ formik }: { formik: any }) => {
    const setProfileImg = (value: any) => {
        if (value) {
            formik.setFieldValue('profilePicture', value);
        }
    }
    return (
        <DialogContent sx={{ padding: "20px 30px" }}>
            <Stack spacing={3} sx={{ minWidth: "550px" }}>
                <Stack spacing={2} direction={'row'}>
                    <Stack direction={'row'} sx={{ width: "100%", alignItems: 'center' }}>
                        <InputFileField image={formik.values.profilePicture} setImage={setProfileImg} dimension={{ height: 180, width: 180 }} id='admin-profile-pic' />
                    </Stack>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <Box></Box>
                        <GenerateCustTextField label='Email' name="email" formik={formik} />
                        <GenerateCustTextField label='Name' name="name" formik={formik} />
                        <GenerateCustTextField label='Contact' name="contact" formik={formik} />
                    </Stack>
                </Stack>
            </Stack>
        </DialogContent>
    );
}

const AddAdminActionButton = ({ handleDisagree, handleAgree, isEditing }: { handleDisagree: () => void, handleAgree: () => void, isEditing: boolean }) => {
    return (
        <DialogActions sx={{ padding: "20px", display: "flex", gap: "20px" }}>
            <Button onClick={handleDisagree} color="error" variant='outlined'>Close</Button>
            <Button onClick={handleAgree} autoFocus variant='contained'>
                {
                    isEditing ? 'Save' : 'Add'
                }
            </Button>
        </DialogActions>
    );
}


const AddEditAdminModal = ({ open, handleClose, formik, isEditing }: { open: boolean, handleClose: () => void, formik: any, isEditing: boolean }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="add-edit-new-admin-title"
        >
            <DialogTitle id="add-edit-new-admin-title">
                {
                    isEditing? 
                    'Update Admin Details'
                    :
                    'Add New Admin'
                }
            </DialogTitle>
            {
                isEditing ?
                    <UpdateAdminContent formik={formik} />
                    :
                    <AddAdminContent formik={formik} />
            }
            <AddAdminActionButton
                isEditing={isEditing}
                handleDisagree={handleClose}
                handleAgree={formik.handleSubmit}
            />
        </Dialog>
    )
}


export default AddEditAdminModal;
