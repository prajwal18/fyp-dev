import { useSelector } from 'react-redux';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Stack,
    Box
} from '@mui/material';

// Custom Text fields
import { GenerateCustTextField, GenerateCustTextArea } from '../../common/form/CustTextFieldNErrorMsg';
import { GenerateCustSelect } from '../../common/form/CustSelect';
// Custom Text fields
import { selectDDFaculties } from '../../../redux/faculties/faculties.slice';


const CourseContents = ({ formik }: { formik: any }) => {
    const facultiesDD = useSelector(selectDDFaculties);
    return (
        <DialogContent sx={{ padding: "20px 30px" }}>
            <Stack spacing={3} sx={{ minWidth: "400px" }}>
                <Box></Box>
                <GenerateCustTextField label='Name' name="name" formik={formik} />
                <GenerateCustSelect
                    label='Faculty'
                    name='faculty'
                    formik={formik}
                    id='select-faculty'
                    options={facultiesDD && facultiesDD.map((data:any) => ({ name: data.name, value: data.id }))}
                />
                <GenerateCustTextArea label='Description' name="description" rows={2} formik={formik} />
            </Stack>
        </DialogContent>
    );
}

const ActionButtons = ({ handleDisagree, handleAgree, isEditing }: { handleDisagree: () => void, handleAgree: () => void, isEditing: boolean }) => {
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


const AddEditCourse = ({ open, handleClose, formik, isEditing }: { open: boolean, handleClose: () => void, formik: any, isEditing: boolean }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="add-edit-new-course-title"
        >
            <DialogTitle id="add-edit-new-course-title">
                {
                    isEditing ?
                        'Update Course Details'
                        :
                        'Add New Course'
                }
            </DialogTitle>

            {
                <CourseContents formik={formik} />
            }

            <ActionButtons
                isEditing={isEditing}
                handleDisagree={handleClose}
                handleAgree={formik.handleSubmit}
            />
        </Dialog>
    )
}


export default AddEditCourse;
