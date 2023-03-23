import React, { useEffect } from 'react';
import {
    Box, Dialog, DialogTitle,
    Button, Stack, Typography,
    Grid
} from '@mui/material';
import { useRouter } from 'next/router';
import { GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';
import { GenerateCustSelect } from '@/components/Common/form/CustSelect';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { CreateTestSchema, InitialValues } from './CreateTestFormik';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectUser } from '@/redux/general/general.slice';
import { fetchUserAC } from '@/redux/general/actions';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpCreateTest } from '@/service/test.service';
import { updateSelectedTest } from '@/redux/test/test.slice';


const FormComponent = ({ formik }: { formik: any }) => {
    const courses = useSelector(selectCourses);
    return (
        <>
            <Typography sx={{ fontSize: "18px", mb: 1 }}>General Infomation About The Test</Typography>
            <Stack spacing={3} mb={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <GenerateCustTextField
                            formik={formik}
                            name='title'
                            label='Test Title'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustSelect
                            formik={formik}
                            name='courseId'
                            label='Course'
                            id='select-course'
                            options={courses}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField
                            formik={formik}
                            name='subtitle'
                            label='Test Sub-Title'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <GenerateCustTextField
                            formik={formik}
                            name='fullMark'
                            label='Full Marks'
                        />
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
                </Grid>
                <Button type="submit" variant='contained'>Proceed</Button>
            </Stack>
        </>
    );
}

export const UpdateTestModal = ({ open, setOpen, formik, testData }: { open: boolean, setOpen: (value: any) => void, formik: any, testData: any }) => {
    let testDataCopy = JSON.parse(JSON.stringify(testData)); // Making a deep copy of an object

    const handleClose = () => {
        Object.keys(InitialValues).map((key: string) => {
            delete formik.values[key];
        });
        setOpen(false);
    }

    useEffect(() => {
        if (testDataCopy && testDataCopy.dueDate && testDataCopy.releaseDate) {
            testDataCopy.dueDate = testDataCopy.dueDate.split('T')[0];
            testDataCopy.releaseDate = testDataCopy.releaseDate.split('T')[0];
            Object.keys(InitialValues).map((key: string) => {
                formik.setFieldValue(key, testDataCopy[key]);
            });
        }
    }, [testData]); // Don't include formik

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="Create-edit-test-head-data"
        >
            <DialogTitle id="Create-edit-test-head-data" sx={{ fontSize: "24px" }}>
                Create New Test
            </DialogTitle>
            <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ padding: "10px 30px", minWidth: "400px" }}>
                {
                    formik &&
                    <FormComponent formik={formik} />
                }
            </Box>
        </Dialog>
    );
}


const CreateTestModal = ({ open, setOpen }: { open: boolean, setOpen: (value: any) => void }) => {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const { push } = useRouter();
    const handleClose = () => {
        formik.resetForm();
        setOpen(false);
    }
    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: CreateTestSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const response = await apiCallNResp(() => httpCreateTest(values));
                if (response.success) {
                    toast.success('Test created successfully.');
                    dispatch(updateSelectedTest(response.data));
                    push(`/Teacher/CreateTest?id=${response.data._id}`)
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
        if (user._id) {
            formik.setFieldValue('createdBy', user._id);
        }
    }, [user]); // Don't include formik

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="Create-edit-test-head-data"
        >
            <DialogTitle id="Create-edit-test-head-data" sx={{ fontSize: "24px" }}>
                Create New Test
            </DialogTitle>
            <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ padding: "10px 30px", minWidth: "400px" }}>
                {
                    formik &&
                    <FormComponent formik={formik} />
                }
            </Box>
        </Dialog>
    );
}

export default CreateTestModal;