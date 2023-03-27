import React, { useEffect, useState } from 'react';
import {
    Box, Dialog, DialogTitle,
    Grid, TextField, FormControl,
    InputLabel, Select, MenuItem,
    Stack, Button
} from '@mui/material';

// PDF related
import { Document, Page } from "react-pdf";
// PDF related

import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectUser } from '@/redux/general/general.slice';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { apiCallNResp } from '@/utils/apiCallNResp';
import convertToBase64 from '@/utils/convertToBase64';
import { toast } from 'react-toastify';
import { fetchUserAC } from '@/redux/general/actions';
import { GenerateCustSelect } from '@/components/Common/form/CustSelect';
import { GenerateCustTextArea, GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';

// const PdfDisplay = () => {
//     const [numPages, setNumPages] = useState<any>(null);
//     const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
//         setNumPages(numPages);
//     }

//     return (
//         <div>
//             <Document file="https://www.e-verify.gov/sites/default/files/everify/guides/InstructionsCreatePDFofE-VerifyManual.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//                 <Page pageNumber={pageNumber} />
//             </Document>
//             <p>
//                 Page {pageNumber} of {numPages}
//             </p>
//         </div>
//     );
// }


const FormComponent = ({ formik }: { formik: any }) => {

    const [manual, setManual] = useState<any>('');
    const courses = useSelector(selectCourses);

    const handleUpload = async (e: any) => {
        formik.setFieldValue("manual", e.target.files[0]);
        let base64File = await convertToBase64(e.target.files[0]);
        setManual(base64File);
        console.log(base64File);
    }

    useEffect(() => {
        console.log(manual);
    }, [manual])

    return (
        <Box>
            <Grid container spacing={4} mb={4}>
                <Grid item xs={7}>
                    <Stack gap={2}>
                        {/* Filter by Course */}
                        <GenerateCustSelect
                            formik={formik}
                            name='courseId'
                            label='Course'
                            id='select-course'
                            options={courses}
                        />
                        {/* Filter by Course */}
                        <GenerateCustTextField
                            formik={formik}
                            name='title'
                            label='Assignment Title'
                        />
                        <GenerateCustTextField
                            formik={formik}
                            name='releaseDate'
                            label='Release Date'
                            type="date"
                        />
                        <GenerateCustTextField
                            formik={formik}
                            name='dueDate'
                            label='Due Date'
                            type="date"
                        />
                        <GenerateCustTextField
                            formik={formik}
                            name='fullMark'
                            label='Full Marks'
                        />
                        <GenerateCustTextArea
                            formik={formik}
                            name='description'
                            label='Description'
                            rows={2}
                        />
                        <TextField
                            label='Upload Pdf' type="file" fullWidth focused
                            onChange={handleUpload}
                        />
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Stack>
                </Grid>
                <Grid item xs={5}>
                    <Stack direction='row' alignItems='center' sx={{ border: '2px dashed rgba(0,0,0,0.2)', padding: "10px" }}>
                        
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

const CreateAssignment = ({ open, setOpen, isEditing, assignmentData }: { open: boolean, setOpen: (value: any) => void, isEditing?: boolean, assignmentData?: any }) => {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const { push } = useRouter();

    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }
    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const response = await apiCallNResp(() => {/* Do something */ });
                if (response.success) {
                    toast.success('Test created successfully.');
                    //dispatch(updateSelectedTest(response.data));
                    //push(`/Teacher/CreateTest?id=${response.data._id}`)
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    useEffect(() => {
        dispatch(fetchUserAC());
    }, [dispatch]);

    useEffect(() => {
        if (user._id && !isEditing) {
            formik.setFieldValue('createdBy', user._id);
        }
    }, [user]); // Don't include formik

    useEffect(() => {
        if (isEditing && assignmentData) {
            Object.keys({}).map((key: string) => {
                formik.setFieldValue(key, assignmentData[key]);
            });
        }
    }, [isEditing, assignmentData]); // Don't include formik

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
            <Box component='form' onSubmit={() => { }} style={{ padding: "20px 40px", minWidth: "800px" }}>
                <FormComponent formik={formik} />
            </Box>
        </Dialog>
    )
}

export default CreateAssignment;