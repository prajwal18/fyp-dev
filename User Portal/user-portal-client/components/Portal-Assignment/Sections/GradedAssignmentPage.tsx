import React, { useState, useCallback } from 'react';
import {
    Stack, Box, Tabs, Tab
} from '@mui/material';
import { AssignmentSubmissionTable, AssignmentInfoTable, AssignmentTitle } from '../Common/AssignmentTableComponents';
import { useSelector } from 'react-redux';
import { selectSelectedSubmittedAssignment } from '@/redux/assignment/assignment.slice';
import { selectUser } from '@/redux/general/general.slice';
import { UserTypes } from '@/constants/Constants';
import EditGrading from '@/components/Common/EditGrading';
import { useRouter } from 'next/router';



const AssignmentTabs = ({ value, setValue }: { value: number, setValue: (value: any) => void }) => {
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
                <Tab value={1} label="Submission Information" />
            </Tabs>
        </Box>
    );
}

const AssignmentResults = ({ submittedAssignment }: { submittedAssignment: any }) => {
    const user = useSelector(selectUser);
    const { push } = useRouter();
    const handleEditGrading = useCallback(() => {
        push(`/Teacher/GradeAssignment?id=${submittedAssignment._id}`)
    }, [push, submittedAssignment])
    return (
        <Box>
            {
                user && user.role === UserTypes.TEACHER &&
                <EditGrading handleEdit={handleEditGrading} />
            }
            <AssignmentSubmissionTable submittedAssignment={submittedAssignment} />
        </Box>
    );
}

const RenderTabPanel = ({ page, submittedAssignment }: { page: number, submittedAssignment: any }) => {
    if (page === 0) {
        return (<AssignmentInfoTable submittedAssignment={submittedAssignment} />);
    } else if (page === 1) {
        return (<AssignmentResults submittedAssignment={submittedAssignment} />);
    } else {
        return (<></>);
    }
}

const GradedAssignmentContainer = () => {
    const submittedAssignment = useSelector(selectSelectedSubmittedAssignment);
    const [page, setPage] = useState<number>(0); // To navigate between Assignment Info (0) page and Submission Info (1) page.
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
                        <AssignmentTabs value={page} setValue={setPage} />
                        <Box sx={{ padding: "30px 20px" }}>
                            <RenderTabPanel page={page} submittedAssignment={submittedAssignment} />
                        </Box>
                    </Box>
                </Stack>
            }
        </>
    );
}

export default GradedAssignmentContainer;