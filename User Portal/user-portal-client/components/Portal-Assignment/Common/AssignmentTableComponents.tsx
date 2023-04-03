import { useEffect } from 'react';
import {
    TableContainer, Table, TableBody, TableCell,
    Typography, Stack, Button, Box, TextField
} from '@mui/material';
import Lottie from "lottie-react";
// MUI ICONS
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
// MUI ICONS
// Styled component
import { BoldTableCell, BWTableRow } from '@/components/Common/styled/StyledComponents';
import manualLottie from '@/public/Lottie/manual-lottie.json';
import assignmentLottie from '@/public/Lottie/assignment-lottie.json'
import { toast } from 'react-toastify';
import Link from 'next/link';
import { baseURL } from '@/utils/endpoints';
import convertToBase64 from '@/utils/convertToBase64';
import { ErrorMessage } from '@/components/Common/form/CustTextFieldNErrorMsg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, updateReceiver } from '@/redux/message/message.slice';
import { useRouter } from 'next/router';
import { fetchAllCourseMembersAC } from '@/redux/message/actions';
import { selectUser } from '@/redux/general/general.slice';
import { UserTypes } from '@/constants/Constants';



export const UploadFileComponent = ({ formik, name, label }: { formik: any, name: string, label: string }) => {
    const handleUpload = async (e: any) => {
        let base64File = await convertToBase64(e.target.files[0]);
        formik.setFieldValue(name, base64File);
    }
    return (
        <Box>
            <TextField
                label={label} type="file" fullWidth focused
                inputProps={{ accept: 'application/pdf' }} onChange={handleUpload}
            />
            {formik.touched?.[name] && formik.errors?.[name] && <ErrorMessage message={formik.errors[name]} />}
        </Box>
    )
}

export const AssignmentTitle = ({ title, teacher, date }: { title: string, teacher: string, date: string }) => {
    return (
        <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>{title}</Typography>
            <Typography sx={{ fontSize: "0.9rem", my: 1 }}>{teacher} &middot; {date?.split("T")[0]}</Typography>
        </Box>
    );
}




export const AssignmentInfoTable = ({ submittedAssignment }: { submittedAssignment: any }) => {
    const handleNoManual = () => {
        toast.info("Sorry, no manual present.");
    }

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>{submittedAssignment?.assignmentId?.courseId?.name}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Assigned Date</BoldTableCell>
                        <TableCell>{submittedAssignment?.assignmentId?.releaseDate?.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Due Date</BoldTableCell>
                        <TableCell>{submittedAssignment?.assignmentId?.dueDate?.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Total Marks</BoldTableCell>
                        <TableCell>{submittedAssignment?.assignmentId?.fullMark}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Description</BoldTableCell>
                        <TableCell sx={{ padding: "10px" }}>
                            {submittedAssignment?.assignmentId?.description}
                        </TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>Assignment Manual</BoldTableCell>
                        <TableCell sx={{ padding: "20px" }}>
                            <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                <Stack sx={{ padding: "10px", maxWidth: "150px" }}>
                                    <Lottie animationData={manualLottie} loop={true} />
                                </Stack>

                                {
                                    submittedAssignment?.assignmentId?.manual ?
                                        <Link
                                            href={`${baseURL}${submittedAssignment.assignmentId.manual}`}
                                            target="_blank" rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "white" }}
                                        >
                                            <Button color="info" variant="contained">
                                                <DownloadIcon />
                                                &nbsp; Download File
                                            </Button>
                                        </Link>
                                        :
                                        <Button color="info" variant="contained" onClick={handleNoManual}>
                                            <DownloadIcon />
                                            <Typography>&nbsp; Download File</Typography>
                                        </Button>

                                }


                            </Stack>
                        </TableCell>
                    </BWTableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export const AssignmentToBeGraded = ({ submittedAssignment }: { submittedAssignment: any }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const { push } = useRouter();

    useEffect(() => {
        dispatch(fetchAllCourseMembersAC());
    }, [])

    const handleMessage = (id: string) => {
        if (users?.length) {
            const member = users.find((member: any) => member._id === id);
            dispatch(updateReceiver(member));
            push(`/${user.role}/Message`);
        }
    }
    const handleNoSubmissionFile = () => {
        toast.info("Sorry, no submission file present.");
    }
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>{submittedAssignment?.assignmentId?.courseId?.name}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Status</BoldTableCell>
                        {
                            submittedAssignment.isGraded ?
                                <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                                :
                                <TableCell sx={{ color: "#1976D2", fontWeight: "700" }}>Pending</TableCell>
                        }
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submission Date</BoldTableCell>
                        <TableCell>{submittedAssignment?.submissionDate?.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submitted By</BoldTableCell>
                        {
                            user.role === UserTypes.TEACHER ?
                                <TableCell>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <Box>{submittedAssignment?.submittedBy?.name}</Box>
                                        <Button variant="text" onClick={() => handleMessage(submittedAssignment?.submittedBy?._id)}>
                                            <SendIcon color="info" />
                                        </Button>
                                    </Stack>
                                </TableCell>
                                :
                                <TableCell>{submittedAssignment?.submittedBy?.name}</TableCell>
                        }
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>{"Student\'s Comment"}</BoldTableCell>
                        <TableCell>
                            {submittedAssignment?.studentComment}
                        </TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>Submission File</BoldTableCell>
                        <TableCell sx={{ padding: "20px" }}>
                            <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                <Stack sx={{ padding: "10px", maxWidth: "150px" }}>
                                    <Lottie animationData={assignmentLottie} loop={true} />
                                </Stack>
                                {
                                    submittedAssignment?.submissionFile ?
                                        <Link
                                            href={`${baseURL}${submittedAssignment.submissionFile}`}
                                            target="_blank" rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "white" }}
                                        >
                                            <Button color="info" variant="contained">
                                                <DownloadIcon />
                                                &nbsp; Download File
                                            </Button>
                                        </Link>
                                        :
                                        <Button color="info" variant="contained" onClick={handleNoSubmissionFile}>
                                            <DownloadIcon />
                                            <Typography>&nbsp; Download File</Typography>
                                        </Button>

                                }
                            </Stack>
                        </TableCell>
                    </BWTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export const AssignmentSubmissionTable = ({ user, submittedAssignment }: { user: any, submittedAssignment: any }) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const { push } = useRouter();

    useEffect(() => {
        dispatch(fetchAllCourseMembersAC());
    }, [])

    const handleMessage = (id: string) => {
        if (users?.length) {
            const member = users.find((member: any) => member._id === id);
            dispatch(updateReceiver(member));
            push(`/${user.role}/Message`);
        }
    }
    const handleNoSubmissionFile = () => {
        toast.info("Sorry, no submission file present.");
    }
    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>

                        <BWTableRow>
                            <BoldTableCell>Course</BoldTableCell>
                            <TableCell>{submittedAssignment?.assignmentId?.courseId?.name}</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Status</BoldTableCell>
                            {
                                submittedAssignment.isGraded ?
                                    <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                                    :
                                    <TableCell sx={{ color: "#1976D2", fontWeight: "700" }}>Pending</TableCell>
                            }
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>Marks Obtained</BoldTableCell>
                            <TableCell>{submittedAssignment?.marksObtained}</TableCell>
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>Submission Date</BoldTableCell>
                            <TableCell>{submittedAssignment?.submissionDate?.split("T")[0]}</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Submitted By</BoldTableCell>
                            {
                                user.role === UserTypes.TEACHER ?
                                    <TableCell>
                                        <Stack direction='row' alignItems='center' gap={1}>
                                            <Box>{submittedAssignment?.submittedBy?.name}</Box>
                                            <Button variant="text" onClick={() => handleMessage(submittedAssignment?.submittedBy?._id)}>
                                                <SendIcon color="info" />
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                    :
                                    <TableCell>{submittedAssignment?.submittedBy?.name}</TableCell>
                            }
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>{"Student\'s Comment"}</BoldTableCell>
                            <TableCell>
                                {submittedAssignment?.studentComment}
                            </TableCell>
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>Submission File</BoldTableCell>
                            <TableCell sx={{ padding: "20px" }}>
                                <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                    <Stack sx={{ padding: "10px", maxWidth: "150px" }}>
                                        <Lottie animationData={assignmentLottie} loop={true} />
                                    </Stack>
                                    {
                                        submittedAssignment?.submissionFile ?
                                            <Link
                                                href={`${baseURL}${submittedAssignment.submissionFile}`}
                                                target="_blank" rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: "white" }}
                                            >
                                                <Button color="info" variant="contained">
                                                    <DownloadIcon />
                                                    &nbsp; Download File
                                                </Button>
                                            </Link>
                                            :
                                            <Button color="info" variant="contained" onClick={handleNoSubmissionFile}>
                                                <DownloadIcon />
                                                <Typography>&nbsp; Download File</Typography>
                                            </Button>

                                    }
                                </Stack>
                            </TableCell>
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>Graded By</BoldTableCell>
                            {
                                user.role === UserTypes.STUDENT ?
                                    <TableCell>
                                        <Stack direction='row' alignItems='center' gap={1}>
                                            <Box>{submittedAssignment?.gradedBy?.name}</Box>
                                            <Button variant="text" onClick={() => handleMessage(submittedAssignment?.gradedBy?._id)}>
                                                <SendIcon color="info" />
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                    :
                                    <TableCell>{submittedAssignment?.gradedBy?.name}</TableCell>
                            }
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>{"Teacher\'s Remark"}</BoldTableCell>
                            <TableCell>
                                {submittedAssignment?.remark}
                            </TableCell>
                        </BWTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

