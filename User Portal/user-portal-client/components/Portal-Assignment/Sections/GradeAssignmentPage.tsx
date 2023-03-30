import { useState, useEffect } from "react";
import {
    Stack, Box, Tabs, Tab, TextField,
    Button,
    Typography
} from '@mui/material';
import { toast } from "react-toastify";
import { AssignmentInfoTable, AssignmentTitle, AssignmentToBeGraded } from "../Common/AssignmentTableComponents";
import { BorderedBox } from "@/components/Common/styled/StyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedSubmittedAssignment } from "@/redux/assignment/assignment.slice";
import { useFormik } from "formik";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { httpGradeSubmittedAssignment } from "@/service/assignment.submission.service";
import { GASchema, InitialValues } from "./GradeAssignmentFormik";
import { fetchSelectedSubmittedAssignmentAC } from "@/redux/assignment/actions";
import { GenerateCustTextArea, GenerateCustTextField } from "@/components/Common/form/CustTextFieldNErrorMsg";
import { fetchUserAC } from "@/redux/general/actions";
import { selectUser } from "@/redux/general/general.slice";
import { useRouter } from "next/router";

const GradeAssignmentForm = ({ formik }: { formik: any }) => {
    return (
        <BorderedBox sx={{ minWidth: "400px", alignSelf: "flex-start" }}>
            <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
                <Typography sx={{ fontSize: "22px" }}>Grade Assignment</Typography>
                <GenerateCustTextField
                    formik={formik}
                    name="marksObtained"
                    label="Marks Obtained"
                />
                <GenerateCustTextArea
                    formik={formik}
                    name="remark"
                    label="Leave a remark"
                    rows={3}
                />
                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>
            </Stack>
        </BorderedBox>
    );
}

const RenderTabPanel = ({ page, formik, submittedAssignment }: { page: number, formik: any, submittedAssignment: any }) => {
    if (page === 0) {
        return (<AssignmentInfoTable submittedAssignment={submittedAssignment} />);
    } else if (page === 1) {
        return (
            <Stack direction='row' spacing={3}>
                <AssignmentToBeGraded submittedAssignment={submittedAssignment} />
                <GradeAssignmentForm formik={formik} />
            </Stack>
        );
    } else {
        return (<></>);
    }
}

const GradeAssignmentTabs = ({ value, setValue }: { value: number, setValue: (value: any) => void }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Select to navigate between assignment info and assignment submission info"
            >
                <Tab
                    value={0}
                    label="Assignment Information"
                />
                <Tab value={1} label="Grade Assignment" />
            </Tabs>
        </Box>
    );
}

const GradeAssignmentContainer = () => {
    const { push } = useRouter();
    const [page, setPage] = useState<number>(0); // To navigate between Assignment Info (0) page and Submission Info (1) page.
    const submittedAssignment = useSelector(selectSelectedSubmittedAssignment);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: GASchema,
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            try {
                if (values.submissionFile && values.submissionFile.includes('/public/submissions/')) {
                    delete values.submissionFile;
                }
                const sendData = {
                    ...values,
                    gradedBy: user._id
                }
                const response = await apiCallNResp(() => httpGradeSubmittedAssignment(sendData, submittedAssignment._id));
                console.log(response);
                if (response.success) {
                    dispatch(fetchSelectedSubmittedAssignmentAC({ id: submittedAssignment._id }));
                    toast.success(response.message);
                    push("/Teacher/Assignment");
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });
    useEffect(() => {
        if (submittedAssignment?._id) {
            formik.setFieldValue("marksObtained", submittedAssignment?.marksObtained || 0);
            formik.setFieldValue("remark", submittedAssignment?.remark || '');
        }
    }, [submittedAssignment]); // Don't include formik here

    return (
        <>
            {
                submittedAssignment._id &&
                <Stack
                    sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
                    direction='row'
                    alignItems='flex-start'
                >
                    <Box sx={{ padding: "20px", width: "100%" }}>
                        <AssignmentTitle
                            title={submittedAssignment.assignmentId.title}
                            teacher={submittedAssignment.assignmentId.createdBy.name}
                            date={submittedAssignment.assignmentId.releaseDate}
                        />
                        <GradeAssignmentTabs value={page} setValue={setPage} />
                        <Box sx={{ padding: "30px 20px" }}>
                            <RenderTabPanel page={page} formik={formik} submittedAssignment={submittedAssignment} />
                        </Box>
                    </Box>
                </Stack>
            }
        </>
    );
}

export default GradeAssignmentContainer;
