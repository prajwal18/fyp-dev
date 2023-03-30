import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Box, Typography, Stack,
    Button, TextField
} from '@mui/material';

import { AssignmentInfoTable, AssignmentTitle, UploadFileComponent } from '../Common/AssignmentTableComponents';
import uploadFileImg from '@/public/Images/uploadFile.png';

// Styled component
import { BorderedBox } from '@/components/Common/styled/StyledComponents';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedSubmittedAssignment } from '@/redux/assignment/assignment.slice';
import { useFormik } from 'formik';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUpdateSubmittedAssignment } from '@/service/assignment.submission.service';
import { toast } from 'react-toastify';
import { InitialValues, SASchema } from './SubmitAssignmentFormik';
import { GenerateCustTextArea } from '@/components/Common/form/CustTextFieldNErrorMsg';
import { baseURL } from '@/utils/endpoints';
import Link from 'next/link';
import { fetchSelectedSubmittedAssignmentAC } from '@/redux/assignment/actions';


const ChangeSubmission = ({ formik, submittedAssignment }: { formik: any, submittedAssignment: any }) => {
    const [change, setChange] = useState(false);
    const handleChangeSubmission = () => { setChange(true) };
    const handleCancel = () => {
        formik.setFieldValue(submittedAssignment?.submittedAssignment || '');
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
                        <UploadFileComponent formik={formik} name="submissionFile" label="Submission File" />
                    </Box>
                    :
                    <Stack sx={{ paddingBottom: "10px" }} justifyContent="space-between" direction={"row"} spacing={2}>
                        <Button onClick={handleChangeSubmission} color="primary" variant='outlined'>Change Submission</Button>
                        <Link
                            href={`${baseURL}${submittedAssignment.submissionFile}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <Button>View Submitted</Button>
                        </Link>
                    </Stack>
            }
        </>
    )
}


const SubmitContainer = ({ formik, submittedAssignment }: { formik: any, submittedAssignment: any }) => {
    return (
        <Stack direction='row' spacing={2} mt={5}>

            <BorderedBox sx={{ width: "60%", minWidth: "650px" }}>
                <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
                    <Stack direction="row" sx={{ gap: "20px", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                        <Typography sx={{ fontSize: "24px" }}>Submit Your Work</Typography>
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "700" }}>Assign</Typography>
                    </Stack>
                    {
                        submittedAssignment?.submissionFile ?
                            <ChangeSubmission formik={formik} submittedAssignment={submittedAssignment} />
                            :
                            <UploadFileComponent formik={formik} name="submissionFile" label="Submission File" />

                    }
                    <GenerateCustTextArea
                        formik={formik}
                        name='studentComment'
                        label='Add a Comment'
                        rows={4}
                    />
                    <Button variant="contained" sx={{ width: "100%", padding: "10px" }} type="submit">
                        <Typography>Mark As Done</Typography>
                    </Button>
                </Stack>
            </BorderedBox>

            <BorderedBox sx={{ width: "40%" }}>
                <Stack sx={{ padding: "10px" }}>
                    <Image
                        src={uploadFileImg}
                        alt="Submission File Upload"
                        style={{
                            maxWidth: "100%",

                            maxHeight: "300px",
                            objectFit: "contain"
                        }}
                    />
                </Stack>
            </BorderedBox>
        </Stack>
    );
}
const SubmitAssignmentContainer = () => {
    const submittedAssignment = useSelector(selectSelectedSubmittedAssignment);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: SASchema,
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            try {
                if ((values.submissionFile && values.submissionFile.includes('/public/submissions/')) || values.submissionFile === '') {
                    delete values.submissionFile;
                }
                const response = await apiCallNResp(() => httpUpdateSubmittedAssignment(values, submittedAssignment._id));
                if (response.success) {
                    dispatch(fetchSelectedSubmittedAssignmentAC({ id: response.data._id }))
                    toast.success(response.message);
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    useEffect(() => {
        if (submittedAssignment?._id) {
            formik.setFieldValue("studentComment", submittedAssignment?.studentComment || '');
            formik.setFieldValue("submissionFile", submittedAssignment?.submissionFile || '');
        }
    }, [submittedAssignment]); // Don't include formik here

    return (
        <>
            {
                submittedAssignment._id &&
                <Stack
                    sx={{ padding: "20px 30px", minHeight: "95vh" }}
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                >

                    <Box sx={{ padding: "20px" }}>
                        <AssignmentTitle
                            title={submittedAssignment.assignmentId.title}
                            teacher={submittedAssignment.assignmentId.createdBy.name}
                            date={submittedAssignment.assignmentId.releaseDate}
                        />
                        <SubmitContainer formik={formik} submittedAssignment={submittedAssignment} />
                        <BorderedBox mt={5}>
                            <Typography mb={3} sx={{ fontSize: "24px" }}>Assignment Information</Typography>
                            <AssignmentInfoTable submittedAssignment={submittedAssignment} />
                        </BorderedBox>
                    </Box>
                </Stack>
            }
        </>
    );
}


export default SubmitAssignmentContainer;