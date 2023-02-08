import LinearProgress from "@mui/material/LinearProgress";
import { Box, Stack, Typography, Grid } from "@mui/material";
import {
    CustStack, CustTypography,
    ReadLessonBtn, Score, TestBtn
} from "../Common/ContainersNButtons";
import DashLayout from "../Layout/DashLayout/DashLayout";                       // Dashboard Layout/Container 
import { allTestData } from "./MockData/DashboardMockData";

type ExamDataType = {
    title: string, graded: boolean, score?: string, gradedAt?: string
}

const TestContainer = ({ index, examData }: { index: number, examData: ExamDataType }) => {
    return (
        <Box sx={{ padding: "15px", background: "rgba(200,200,200, 0.2)" }}>
            <Typography sx={{ margin: "10px 0px", fontWeight: "700", color: "#283559" }}>{examData.title}</Typography>
            <Box sx={{ padding: "0px 10px" }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <CustTypography sx={{ fontSize: "0.8rem" }}>Review:</CustTypography>
                    {
                        examData.score &&
                        <Score score={examData.score} />
                    }
                </Stack>
                <Stack direction="row" spacing={1} sx={{mt: 2}}>
                    <ReadLessonBtn />
                    {
                        !examData.graded &&
                        <TestBtn title="Take Test" />
                    }
                </Stack>
            </Box>
        </Box>
    )
}

const SubjectSection = ({ subject }: { subject: string }) => {
    return (
        <Box sx={{ borderRadius: "5px", overflow: "hidden", border: "1px solid #9c9c9c" }}>
            <Box sx={{ borderBottom: "1px solid grey", padding: "30px 20px 20px", background: "rgba(100,100,100,0.15)" }}>
                <CustTypography sx={{ fontSize: "22px", fontWeight: "700" }}>{subject}</CustTypography>
                <Box sx={{ width: '100%', color: 'rgba(0,0,0,0.4)', margin: "10px 0px" }}>
                    <LinearProgress variant="determinate" color="inherit" value={25} sx={{ height: "10px", borderRadius: "10px" }} />
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ padding: "10px" }}>
                {
                    allTestData.map((item: ExamDataType, index: number) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <TestContainer index={index} examData={item} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

const ProgrssContainer = () => {
    return (
        <CustStack direction="column">
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Upcomming Tests</CustTypography>
            <Stack spacing={2}>
                <SubjectSection subject="Science" />
            </Stack>
        </CustStack>
    )
}

const ProgressPage = () => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <ProgrssContainer />
            </Box>
        </DashLayout>
    );
}

export default ProgressPage;