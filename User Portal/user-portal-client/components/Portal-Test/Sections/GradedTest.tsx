import React, { useState } from 'react';
import {
    Stack, Tabs, Tab,
    Box, Button
} from '@mui/material';
import { GradeTestTable, HideInstructionsBtn, TestInstructions, TestQuestions, TestTitle } from '../Common/TestCommonComponents';
import { MockTestData } from '@/constants/TempDataDeleteLater';
import { TestQuestionListType } from '@/constants/Constants';


const GradedTestPaperSection = () => {
    const [show, setShow] = useState(false);
    return (
        <Box>
            <Stack direction='row' gap={2} mb={2}>
                <HideInstructionsBtn show={show} setShow={setShow} />
                <Button
                    color='primary'
                    variant="outlined"
                >
                    Next
                </Button>
            </Stack>

            <Stack direction='row' gap={2}>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <TestQuestions
                        testQuestions={MockTestData.testQuestions}
                        type={TestQuestionListType.GRADED_TEST}
                    />
                </Stack>
                {
                    show &&
                    <Box sx={{ width: "50%" }}>
                        <TestInstructions
                            instructions={MockTestData.testInstructions}
                        />
                    </Box>
                }
            </Stack>

        </Box>
    )
}
const TestResults = () => {
    return (
        <Box>
            <GradeTestTable isGraded={true}/>
        </Box>
    );
}


const TestTabs = ({ value, setValue }: { value: number, setValue: (value: any) => void }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between'>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Select to navigate between Test Instructions and Test Questions"
            >
                <Tab
                    value={0}
                    label="Test Paper"
                />
                <Tab value={1} label="Grade Test" />
            </Tabs>
        </Stack>
    );
}

const RenderTabPanel = ({ page }: { page: number }) => {
    if (page === 0) {
        return (<GradedTestPaperSection />);
    } else if (page === 1) {
        return (<TestResults />);
    } else {
        return (<></>);
    }
}


const GradedTestContainer = () => {
    const [page, setPage] = useState<number>(0); // To navigate between Test Instructions and Test Questions
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <TestTitle />
                <TestTabs value={page} setValue={setPage} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} />
                </Box>
            </Box>
        </Stack>

    );
}

export default GradedTestContainer;