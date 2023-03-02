import React, { useState } from 'react';
import {
    Box, Tabs, Tab,
    Stack, Typography
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
// MUI Icons
import { AddNewQuestion, TestQuestionContainer, TestTitle } from '../Common/TestCommonComponents';
import QNAModal from '../Common/QNAModal';
import MCQModal from '../Common/MCQModal';
import { AddBtn } from '@/components/Common/styled/StyledComponents';

const TestTabs = ({ value, setValue }: { value: number, setValue: (value: any) => void }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Select to navigate between Test Instructions and Test Questions"
            >
                <Tab
                    value={0}
                    label="Test Instructions"
                />
                <Tab value={1} label="Test Questions" />
            </Tabs>
        </Box>
    );
}

const TestQuestionSection = () => {
    const [testQuestions, setTestQuestions] = useState<Array<any>>([]);
    const [addNewQuestion, setAddNewQuestion] = useState(true);
    const handleAddNewQuestion: () => void = () => { setAddNewQuestion(true) };

    //For Dialogue box to add new question
    const [toOpen, setToOpen] = useState("Q&A"); // Possible values Q&A or MCQ
    const [open, setOpen] = useState(false);
    const handleOpenMCQ = () => {
        setToOpen("MCQ");
        setOpen(true);
    }
    const handleOpenQNA = () => {
        setToOpen("Q&A");
        setOpen(true);
    }
    //For Dialogue box to add new question
    return (
        <Stack spacing={2}>
            <>
                {
                    testQuestions.map((question: any) => (
                        <React.Fragment key={question.id}>
                            <TestQuestionContainer question={question} />
                        </React.Fragment>
                    ))
                }
            </>
            <>
                {
                    addNewQuestion &&
                    <AddNewQuestion
                        testQuestions={testQuestions}
                        handleOpenMCQ={handleOpenMCQ}
                        handleOpenQNA={handleOpenQNA}
                    />
                }
            </>
            <AddBtn sx={{ minWidth: "100%", padding: "10px 20px !important", color: "white", justifyContent: "center" }} onClick={handleAddNewQuestion}>
                <AddIcon />
                <Typography sx={{ fontSize: "18px" }}>Add another question</Typography>
            </AddBtn>
            <>
                {
                    toOpen === "Q&A" ?
                        <QNAModal open={open} setOpen={setOpen} testQuestions={testQuestions} setTestQuestions={setTestQuestions} setAddNewQuestion={setAddNewQuestion} />
                        :
                        <MCQModal open={open} setOpen={setOpen} testQuestions={testQuestions} setTestQuestions={setTestQuestions} setAddNewQuestion={setAddNewQuestion} />
                }
            </>
        </Stack>
    );
}

const RenderTabPanel = ({ page }: { page: number }) => {
    if (page === 0) {
        return (<Box />);
    } else if (page === 1) {
        return (<TestQuestionSection />);
    } else {
        return (<></>);
    }
}

const CreateTestContainer = () => {
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



export default CreateTestContainer;