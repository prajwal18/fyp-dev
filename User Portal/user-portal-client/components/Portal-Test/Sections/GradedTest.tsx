import React, { useState, useCallback, useEffect } from 'react';
import {
    Stack, Tabs, Tab,
    Box,
} from '@mui/material';
import { GradeTestTable, HideInstructionsBtn, TestInstructions, TestQuestions, TestTitle } from '../Common/TestCommonComponents';
import { TestQuestionListType, UserTypes } from '@/constants/Constants';
import { useSelector } from 'react-redux';
import { selectSelectedAnswerPaper } from '@/redux/test/test.slice';
import { selectUser } from '@/redux/general/general.slice';
import EditGrading from '@/components/Common/EditGrading';
import { useRouter } from 'next/router';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpDeleteTestAnswer } from '@/service/test.answer.service';
import { toast } from 'react-toastify';


const GradedTestPaperSection = ({ answerPaper }: { answerPaper: any }) => {
    const [show, setShow] = useState(true);
    // const [answerSheet, setAnswerSheet] = useState([]);
    // useEffect(() => {
    //     if (answerPaper?._id) {
    //         if (answerPaper?.questions.length) {
    //             let questions = JSON.parse(JSON.stringify(answerPaper.testPaperId.questions));
    //             let newQuestions = questions.map((question: any) => {
    //                 let ans = answerPaper.questions.filter((answer: any) => answer._id === question._id)[0];
    //                 if (ans) {
    //                     return { ...question, answer: ans.answer, marksObtained: ans?.marksObtained || 0 }
    //                 } else {
    //                     return { ...question, answer: [''], marksObtained: ans?.marksObtained || 0 }
    //                 }
    //             });
    //             setAnswerSheet(newQuestions);
    //         } else {
    //             let questions = JSON.parse(JSON.stringify(answerPaper.testPaperId.questions));
    //             let newQuestions = questions.map((question: any) => ({ ...question, answer: [''], marksObtained: 0 }));
    //             setAnswerSheet(newQuestions);
    //         }
    //     }
    // }, [answerPaper]);

    return (
        <Box>
            <Stack direction='row' gap={2} mb={2}>
                <HideInstructionsBtn show={show} setShow={setShow} />
            </Stack>

            <Stack direction='row' gap={2}>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <TestQuestions
                        testQuestions={answerPaper?.questions || []}
                        type={TestQuestionListType.GRADED_TEST}
                    />
                </Stack>
                {
                    show &&
                    <Box sx={{ width: "50%" }}>
                        <TestInstructions
                            instructions={answerPaper?.testPaperId?.instructions || ''}
                        />
                    </Box>
                }
            </Stack>

        </Box>
    )
}
const TestResults = ({ answerPaper }: { answerPaper: any }) => {
    const user = useSelector(selectUser);
    const { push } = useRouter();
    const handleEditGrading = useCallback(() => {
        push(`/Teacher/GradeTest?id=${answerPaper._id}`)
    }, [push, answerPaper])
    const handleDeleteSubmission = useCallback(async () => {
        const response = await apiCallNResp(() => httpDeleteTestAnswer(answerPaper._id));
        if(response.success){
            toast.success(response.message);
            push(`/Teacher/Test`);
        }
    }, [push, answerPaper])
    return (
        <Box>
            {
                user && user.role === UserTypes.TEACHER &&
                <EditGrading handleEdit={handleEditGrading} handleDelete={handleDeleteSubmission} />
            }
            <GradeTestTable user={user} answerPaper={answerPaper} />
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
                    label="Answer Paper"
                />
                <Tab value={1} label="Graded Test" />
            </Tabs>
        </Stack>
    );
}

const RenderTabPanel = ({ page, answerPaper }: { page: number, answerPaper: any }) => {

    if (page === 0) {
        return (<GradedTestPaperSection answerPaper={answerPaper} />);
    } else if (page === 1) {
        return (<TestResults answerPaper={answerPaper} />);
    } else {
        return (<></>);
    }
}


const GradedTestContainer = () => {
    const answerPaper = useSelector(selectSelectedAnswerPaper);
    const [page, setPage] = useState<number>(0); // To navigate between Test Instructions and Test Questions
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <TestTitle
                    title={answerPaper?.testPaperId?.title}
                    teacher={answerPaper?.testPaperId?.createdBy?.name}
                    date={answerPaper?.testPaperId?.releaseDate}
                />
                <TestTabs value={page} setValue={setPage} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} answerPaper={answerPaper} />
                </Box>
            </Box>
        </Stack>

    );
}

export default GradedTestContainer;