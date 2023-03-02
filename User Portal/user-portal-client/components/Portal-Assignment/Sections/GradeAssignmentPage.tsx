import { useState } from "react";
import {
    Stack, Box, Tabs, Tab, TextField,
    Button,
    Typography
} from '@mui/material';
import { AssignmentInfoTable, AssignmentTitle, AssignmentToBeGraded } from "../Common/AssignmentTableComponents";
import { BorderedBox } from "@/components/Common/styled/StyledComponents";

const GradeAssignmentForm = () => {
    return (
        <BorderedBox sx={{minWidth:"400px", alignSelf:"flex-start"}}>
            <Stack spacing={2}>
                <Typography sx={{fontSize:"22px"}}>Grade Assignment</Typography>
                <TextField label="Marks Obtained" type="number" />
                <TextField multiline rows={3} label="Leave a reamrk"/>
                <Button color="primary" variant="contained">
                    Submit
                </Button>
            </Stack>
        </BorderedBox>
    );
}

const RenderTabPanel = ({ page }: { page: number }) => {
    if (page === 0) {
        return (<AssignmentInfoTable />);
    } else if (page === 1) {
        return (
            <Stack direction='row' spacing={3}>
                <AssignmentToBeGraded />
                <GradeAssignmentForm />
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
    const [page, setPage] = useState<number>(0); // To navigate between Assignment Info (0) page and Submission Info (1) page.
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <AssignmentTitle />
                <GradeAssignmentTabs value={page} setValue={setPage} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} />
                </Box>
            </Box>
        </Stack>
    );
}

export default GradeAssignmentContainer;
