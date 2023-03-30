import React, { useEffect, useState } from 'react';
import {
    Box, Dialog, DialogTitle,
    Grid, TextField, Button, Stack
} from '@mui/material';


import { useSelector } from 'react-redux';
import { selectCourses } from '@/redux/general/general.slice';
import convertToBase64 from '@/utils/convertToBase64';
import { GenerateCustSelect } from '@/components/Common/form/CustSelect';
import { GenerateCustTextArea, GenerateCustTextField, ErrorMessage } from '@/components/Common/form/CustTextFieldNErrorMsg';
import { baseURL } from '@/utils/endpoints';
import Link from 'next/link';
import { UploadFileComponent } from '../Common/AssignmentTableComponents';




const ChangeSubmission = ({ formik, assignmentData }: { formik: any, assignmentData: any }) => {
    const [change, setChange] = useState(false);
    const handleChangeSubmission = () => { setChange(true) };
    const handleCancel = () => {
        formik.setFieldValue(assignmentData?.assignmentData || '');
        setChange(false);
    }
    return (
        <>
            {
                change ?
                    <Box>
                        <Stack sx={{ padding: "5px" }} direction="row" justifyContent="flex-end">
                            <Button onClick={handleCancel} color="error" variant='contained'>cancel</Button>
                        </Stack>
                        <UploadFileComponent formik={formik} name="manual" label="Upload Manual" />
                    </Box>
                    :
                    <Stack sx={{ paddingBottom: "10px" }} justifyContent="space-between" direction={"row"} spacing={2}>
                        <Button onClick={handleChangeSubmission} color="primary" variant='outlined'>Update Manual</Button>
                        <Link
                            href={`${baseURL}${assignmentData.manual}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <Button variant="contained">View Manual</Button>
                        </Link>
                    </Stack>
            }
        </>
    )
}


const FormComponent = ({ formik, isEditing, assignmentData }: { formik: any, isEditing: boolean, assignmentData?: any }) => {
    const courses = useSelector(selectCourses);

    const handleUpload = async (e: any) => {
        let base64File = await convertToBase64(e.target.files[0]);
        formik.setFieldValue("manual", base64File);
    }

    return (
        <Box>
            <Grid container spacing={3} mb={4}>
                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='title'
                        label='Assignment Title'
                    />
                </Grid>
                <Grid item xs={6}>
                    {/* Filter by Course */}
                    <GenerateCustSelect
                        formik={formik}
                        name='courseId'
                        label='Course'
                        id='select-course'
                        options={courses}
                    />
                    {/* Filter by Course */}
                </Grid>

                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='releaseDate'
                        label='Release Date'
                        type="date"
                    />
                </Grid>
                <Grid item xs={6}>
                    <GenerateCustTextField
                        formik={formik}
                        name='dueDate'
                        label='Due Date'
                        type="date"
                    />
                </Grid>

                <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <GenerateCustTextField
                        formik={formik}
                        name='fullMark'
                        label='Full Marks'
                    />
                    {
                        isEditing ?
                            (assignmentData && assignmentData.manual ?
                                <ChangeSubmission formik={formik} assignmentData={assignmentData} />
                                :
                                <UploadFileComponent formik={formik} name="manual" label="Upload Manual" />)
                            :
                            <Box>
                                <TextField
                                    label='Upload Pdf' type="file" fullWidth focused
                                    inputProps={{ accept: 'application/pdf' }} onChange={handleUpload}
                                />
                                {formik.touched?.manual && formik.errors.manual && <ErrorMessage message={formik.errors?.manual} />}
                            </Box>
                    }
                </Grid>

                <Grid item xs={6}>
                    <GenerateCustTextArea
                        formik={formik}
                        name='description'
                        label='Description'
                        rows={3}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant='contained' sx={{ width: "100%" }}>{
                        isEditing ? 'Update' : 'Submit'
                    }</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

const CreateAssignment = ({ open, formik, handleClose, isEditing, assignmentData }: { open: boolean, formik: any, handleClose: () => void, isEditing: boolean, assignmentData?: any }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="add-edit-assignment"
        >
            <DialogTitle id="add-edit-assignment">
                {
                    isEditing ?
                        'Edit Assignment'
                        :
                        'Create New Assignment'
                }
            </DialogTitle>
            <Box component='form' onSubmit={formik.handleSubmit} style={{ padding: "20px 40px", minWidth: "800px" }}>
                <FormComponent formik={formik} isEditing={isEditing} assignmentData={assignmentData} />
            </Box>
        </Dialog>
    )
}

export default CreateAssignment;