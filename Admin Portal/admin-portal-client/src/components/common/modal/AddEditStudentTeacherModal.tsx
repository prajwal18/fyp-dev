import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Grid,
    Stack, Box, Typography
} from '@mui/material';

// Custom Text fields
import { GenerateCustTextField, GenerateCustTextArea } from '../../common/form/CustTextFieldNErrorMsg';
import PasswordTextField from '../../common/form/PasswordTextField';
// Custom Text fields

const AddContentSection = ({ formik }: { formik: any }) => {

    return (
        <DialogContent sx={{ padding: "20px 30px" }}>
            <Box>
                <Grid container spacing={2} sx={{ minWidth: "550px" }}>
                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section One */}
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Email' name='email' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <PasswordTextField label='Password' name='password' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Contact' name='contact' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Address' name='address' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Zip-Code' name='zipcode' formik={formik} />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    {/* Section One */}

                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section Two */}
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={2} alignItems={'center'} sx={{ borderRadius: "2px", backgroundColor: 'rgba(0,0,0,0.1)', height: '100%', padding: "10px 20px" }}>
                            <Typography>
                                User Role:
                            </Typography>
                            <Typography component='span' sx={{ fontWeight: '700' }}>{formik.values.role}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Name' name='name' formik={formik} />
                    </Grid>
                    {/* Section Two */}

                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section  */}
                    <Grid item xs={12}>
                        <GenerateCustTextArea label='About Me' name='aboutMe' formik={formik} rows={2} />
                    </Grid>
                    {/* Section  */}
                </Grid>
            </Box>
        </DialogContent>
    );
}

const UpdateContentSection = ({ formik }: { formik: any }) => {
    return (
        <DialogContent sx={{ padding: "20px 30px" }}>
            <Box>
                <Grid container spacing={2} sx={{ minWidth: "550px" }}>
                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section One */}
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Email' name='email' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Contact' name='contact' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Address' name='address' formik={formik} />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Zip-Code' name='zipcode' formik={formik} />
                    </Grid>
                    {/* Section One */}

                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section Two */}
                    <Grid item xs={6}>
                        <Stack direction='row' spacing={2} alignItems={'center'} sx={{ borderRadius: "2px", backgroundColor: 'rgba(0,0,0,0.1)', height: '100%', padding: "10px 20px" }}>
                            <Typography>
                                User Role:
                            </Typography>
                            <Typography component='span' sx={{ fontWeight: '700' }}>{formik.values.role}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField label='Name' name='name' formik={formik} />
                    </Grid>
                    {/* Section Two */}

                    <Grid item xs={12} /> {/*Just for spacing*/}

                    {/* Section  */}
                    <Grid item xs={12}>
                        <GenerateCustTextArea label='About Me' name='aboutMe' formik={formik} rows={2} />
                    </Grid>
                    {/* Section  */}
                </Grid>
            </Box>
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


const AddEditStudentTeacherModal = ({ open, handleClose, formik, isEditing }: { open: boolean, handleClose: () => void, formik: any, isEditing: boolean }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby={`add-new-${formik.values.role}-title`}
        >
            <DialogTitle id={`add-new-${formik.values.role}-title`}>
                {
                    isEditing ?
                    `Update ${formik.values.role} - ${formik.values.name}`
                    :
                    `Add New ${formik.values.role}`
                }
            </DialogTitle>
            {
                isEditing ?
                    <UpdateContentSection formik={formik} />
                    :
                    <AddContentSection formik={formik} />
            }
            <ActionButtons
                isEditing={isEditing}
                handleDisagree={handleClose}
                handleAgree={formik.handleSubmit}
            />
        </Dialog>
    )
}


export default AddEditStudentTeacherModal;
