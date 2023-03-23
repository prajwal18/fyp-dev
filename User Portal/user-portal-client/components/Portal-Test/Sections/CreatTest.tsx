import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import {
    Box, Tabs, Tab,
    Stack, Typography,
    Button
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
// MUI Icons
import { AddNewQuestion, TestQuestionContainer, TestTitleViewEdit } from '../Common/TestCommonComponents';
import QNAModal from '../Common/QNAModal';
import MCQModal from '../Common/MCQModal';
import { QuestionType } from '@/constants/CustomTypes';
import { BorderedBox } from '@/components/Common/styled/StyledComponents';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectSelectedTest } from '@/redux/test/test.slice';
// Using dynamic import for jodit
const Jodit = dynamic(() => import('@/components/TextEditor/Jodit'), { ssr: false })
// Using dynamic import for jodit



const SNSBtns = ({ page, setPage }: { page: number, setPage: (value: any) => void }) => {
    const handleNext = () => {
        setPage(1);
    }
    const handlePrev = () => {
        setPage(0);
    }
    return (
        <Stack spacing={1}>
            <Stack direction='row' spacing={1}>
                <Button color="warning" variant='contained'>Save</Button>
                {
                    page === 0 ?
                        <Button color="primary" variant='outlined' onClick={handleNext}>Next</Button>
                        :
                        <Button color="primary" variant='outlined' onClick={handlePrev}>Back</Button>
                }

            </Stack>
            <Button color="error" variant='contained'>Submit</Button>

        </Stack>
    )
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
                    label="Test Instructions"
                />
                <Tab value={1} label="Test Questions" />
            </Tabs>
            <SNSBtns page={value} setPage={setValue} />
        </Stack>
    );
}

const TestQuestionSection = () => {
    const [testQuestions, setTestQuestions] = useState<Array<QuestionType>>([]);
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
            <Button
                sx={{
                    width: "100%", padding: "10px 20px !important",
                    background: "rgb(0 0 0 / 10%)", color: "rgb(0 0 0)",
                    display: "flex", alignItems: "center", gap: "10px"
                }}
                onClick={handleAddNewQuestion}
            >
                <AddIcon />
                <Typography sx={{ fontSize: "20px" }}>Add another question</Typography>
            </Button>
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

const TestInstructionSection = () => {
    const [content, setContent] = useState<any>('');
    return (
        <Stack direction='row' gap={3}>
            <Box sx={{width:"50%"}}>
                <Jodit content={content} setContent={setContent} />
            </Box>
            <BorderedBox sx={{width:"50%"}}>
                {
                    parse(content)
                }
            </BorderedBox>
        </Stack>
    );
}

const RenderTabPanel = ({ page }: { page: number }) => {
    if (page === 0) {
        return (<TestInstructionSection />);
    } else if (page === 1) {
        return (<TestQuestionSection />);
    } else {
        return (<></>);
    }
}

const CreateTestContainer = () => {
    const [page, setPage] = useState<number>(0); // To navigate between Test Instructions and Test Questions
    const testData = useSelector(selectSelectedTest);
    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            console.log(values)
        }
    });
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <TestTitleViewEdit
                    formik={formik}
                    testData={testData}
                />
                <TestTabs value={page} setValue={setPage} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} />
                </Box>
            </Box>
        </Stack>

    );
}



export default CreateTestContainer;