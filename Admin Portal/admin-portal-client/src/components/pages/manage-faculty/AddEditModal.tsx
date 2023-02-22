import {
    Button, Dialog, Box,
    DialogTitle, Stack
} from '@mui/material';

// Custom Text fields
import { GenerateCustTextField } from '../../common/form/CustTextFieldNErrorMsg';
// Custom Text fields


const FacultyContent = ({ formik }: { formik: any }) => {
    return (
        <>
            <GenerateCustTextField label='Name' name="name" formik={formik} />
        </>

    );
}

const ActionButtons = ({ isEditing }: { isEditing: boolean }) => {
    return (
        <Button type="submit" variant='contained' sx={{minWidth:"100%"}}>
            {
                isEditing ? 'Save' : 'Add'
            }
        </Button>
    );
}


const AddEditFaculty = ({ open, handleClose, formik, isEditing }: { open: boolean, handleClose: () => void, formik: any, isEditing: boolean }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="add-edit-new-faculty-title"
        >
            <DialogTitle id="add-edit-new-faculty-title">
                {
                    isEditing ?
                        'Update Faculty Details'
                        :
                        'Add New Faculty'
                }
            </DialogTitle>

            <Stack spacing={2} mt={4} sx={{ minWidth: "400px", padding: "0 20px 20px 20px" }} component='form' onSubmit={formik.handleSubmit}>
                <FacultyContent formik={formik} />
                
                <ActionButtons
                    isEditing={isEditing}
                />
            </Stack>

        </Dialog>
    )
}


export default AddEditFaculty;
