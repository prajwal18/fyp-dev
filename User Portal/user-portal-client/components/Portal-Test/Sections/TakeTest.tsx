import { useState } from "react";
import {
    Box, Stack, Button
} from '@mui/material';
import {
    TestTitle, HideInstructionsBtn,
    TestQuestions, TestInstructions
} from '../Common/TestCommonComponents';
import { TestQuestionListType } from "@/constants/Constants";
// Mock Data
import { MockTestData } from "@/constants/TempDataDeleteLater";
// Mock Data


const SaveNSubmitBtns = () => {
    return (
        <Stack direction='row' gap={2}>
            <Button variant="contained" color="error">Save and Continue...</Button>
            <Button variant="contained" color="error">Save and Submit</Button>
        </Stack>
    );
}

const TakeTestContainer = () => {
    const [show, setShow] = useState(true);
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", minWidth:"50%", width:"100%" }}>
                <TestTitle />
                <Box mt={1} mb={3}>
                    <HideInstructionsBtn show={show} setShow={setShow} />
                </Box>
                <Stack direction='row' gap={2}>
                    <Stack spacing={2} sx={{ width: "100%" }}>
                        <TestQuestions
                            testQuestions={MockTestData.testQuestions}
                            type={TestQuestionListType.TAKE_TEST}
                        />
                        <SaveNSubmitBtns />
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
        </Stack>
    )
}

export default TakeTestContainer;