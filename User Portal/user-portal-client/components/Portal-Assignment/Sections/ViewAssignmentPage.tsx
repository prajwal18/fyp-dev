import React, { useState } from 'react';
import {
    Stack, Box, Tabs, Tab
} from '@mui/material';
import { AssignmentSubmissionTable, AssignmentInfoTable, AssignmentTitle } from '../Common/AssignmentTableComponents';



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

const RenderTabPanel = ({ page }: { page: number }) => {
    if (page === 0) {
        return (<AssignmentInfoTable />);
    } else if (page === 1) {
        return (<AssignmentSubmissionTable />);
    } else {
        return (<></>);
    }
}

const ViewAssignmentContainer = () => {
    const [page, setPage] = useState<number>(0); // To navigate between Assignment Info (0) page and Submission Info (1) page.
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <AssignmentTitle />
                <AssignmentTabs value={page} setValue={setPage} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} />
                </Box>
            </Box>
        </Stack>
    );
}

export default ViewAssignmentContainer;