import { Box, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DashLayout from "../Layout/DashLayout/DashLayout";                       // Dashboard Layout/Container

// Mock Data 
import { teacherComment, upcommingTest, gradedTest } from "./MockData/DashboardMockData";
// Mock Data 
// Importing Components
import {
    CustTypography, CustomContainer, CustStack,
    StackBtnScore, isEven,
    ReadLessonBtn, TestBtn, Score
} from "../Common/ContainersNButtons";
//import { SelectSubject } from "../Common/FormComponents";



// Dashboard Container Sections
export const SelectSubject = () => {
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-subject">
                Select subject
            </InputLabel>
            <Select
                id="select-subject" labelId="select-subject" label="Select Subject"
                defaultValue={"All"}
                sx={{height:"35px", fontSize:"16px"}}
            >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Science"}>Science</MenuItem>
                <MenuItem value={"Psychology"}>Psychology</MenuItem>
            </Select>
        </FormControl>
    )
}
const GradedNUpcomming = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Upcomming Tests</CustTypography>
            <SelectSubject />
            <Stack spacing={3} sx={{ mt: 2 }}>
                {
                    upcommingTest.map((item: any, index: number) => (
                        <CustomContainer key={index} giveBackground={!isEven(index)}>
                            <CustTypography>{item.title}</CustTypography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <ReadLessonBtn />
                                <TestBtn title="Take exam" />
                            </Stack>
                        </CustomContainer>
                    ))
                }
            </Stack>

            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", marginTop: "40px" }}>Recently Graded</CustTypography>
            <Stack spacing={3}>
                {
                    gradedTest.map((item: any, index: number) => (
                        <CustomContainer key={index} giveBackground={!isEven(index)}>
                            <CustTypography>{item.title}</CustTypography>
                            <StackBtnScore direction="row">
                                <Stack direction="row" spacing={1}>
                                    <ReadLessonBtn />
                                    <TestBtn title="Review the exam" />
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"center"}>
                                    <Score score={item.score} />
                                    <CustTypography sx={{ fontSize: "0.85rem" }}>{item.gradedAt}</CustTypography>
                                </Stack>
                            </StackBtnScore>
                        </CustomContainer>
                    ))
                }
                <Box></Box> {/* Just For spacing purpose */}
            </Stack>
        </Box>
    );
}
const RecentTeacherComment = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Recent Teacher&apos;s Comments</CustTypography>
            <Stack sx={{ marginTop: "20px" }} spacing={3}>
                {
                    teacherComment.map((item: any, index: number) => {
                        return (
                            <CustomContainer key={index} giveBackground={isEven(index)}>
                                <CustTypography sx={{ fontStyle: "italic", }}>{item.comment}</CustTypography>
                                <CustTypography sx={{ marginTop: "1rem", fontSize: "0.9rem" }}>&quot;{item.question}&quot;</CustTypography>
                                <CustTypography sx={{ fontSize: "0.85rem" }}>{item.testTitle}</CustTypography>
                            </CustomContainer>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}
// Dashboard Container Sections

const DashboardContainer = () => {
    return (
        <CustStack direction="row">
            <GradedNUpcomming />
            <Box></Box> {/* To add extra spacing */}
            <RecentTeacherComment />
        </CustStack>
    );
}

const DashboardPage = () => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <DashboardContainer />
            </Box>
        </DashLayout>
    );
}

export default DashboardPage;