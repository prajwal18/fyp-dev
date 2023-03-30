import React, { useEffect, useState } from 'react';
import {
    Stack, Tabs, Tab,
    Box, Button
} from '@mui/material';
import * as yup from 'yup';
import {
    GradeTestForm,
    GradeTestTable,
    HideInstructionsBtn, TestInstructions, TestQuestions, TestTitle
} from '../Common/TestCommonComponents';
import { TestQuestionListType, TypesOfQuestions } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedAnswerPaper } from '@/redux/test/test.slice';
import { useFormik } from 'formik';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpGradeTestAnswer } from '@/service/test.answer.service';
import { toast } from 'react-toastify';
import { selectUser } from '@/redux/general/general.slice';
import { fetchSelectedAnswerPaperAC } from '@/redux/test/actions';
import { useRouter } from 'next/router';

// Validation Schema for Grade Test
const validationSchema = yup.object().shape({
    marksObtained: yup.number().required('Provide the marks obtained'),
    remark: yup.string().required('Leave a remark')
});
// Validation Schema for Grade Test



const TestPaperSection = ({ formik, instructions }: { formik: any, instructions: string }) => {
    const [show, setShow] = useState(true);
    const handleAssignMarks = (index: number) => {
        return (marks: number) => {
            const questions = JSON.parse(JSON.stringify(formik.values.questions));
            const currentQuestion = questions[index];
            if (marks > currentQuestion.marks) {
                toast.warn(`Full marks for this question is ${currentQuestion.marks}`);
            } else {
                questions[index] = { ...questions[index], marksObtained: marks }
                formik.setFieldValue('questions', questions);
            }
        }
    }
    const handleAutoCheck = () => {
        const questions = JSON.parse(JSON.stringify(formik.values.questions));
        let totalMarks = 0;
        const newQuestions = questions.map((question: any) => {
            if (TypesOfQuestions.MCQ === question.questionType) {
                let markObt = question.answer[0] === question.correctAnswer[0] ? question.marks : 0;
                totalMarks += markObt;
                return { ...question, marksObtained: markObt };
            } else if (TypesOfQuestions.MCQ_CHOOSE_ALL == question.questionType) {
                let correctCount = 0;
                let totalAnswers = question.correctAnswer.length;
                question.answer.forEach((ans: string) => {
                    if (question.correctAnswer.includes(ans)) {
                        correctCount++;
                    }
                });
                let markObt = Math.ceil(question.marks * (correctCount / totalAnswers));
                totalMarks += markObt;
                return { ...question, marksObtained: markObt };
            } else {
                totalMarks += 0;
                return { ...question, marksObtained: 0 };
            }
        });
        formik.setFieldValue('marksObtained', totalMarks);
        formik.setFieldValue('questions', newQuestions);
    }
    return (
        <Box>
            <Stack direction='row' gap={2} mb={2}>
                <HideInstructionsBtn show={show} setShow={setShow} />
                <Button
                    color='error'
                    variant="contained"
                    title="Note: Can only auto-grade MCQ questions (Single and Choose Many)"
                    onClick={handleAutoCheck}
                >
                    Auto Check
                </Button>
            </Stack>

            <Stack direction='row' gap={2}>
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <TestQuestions
                        testQuestions={formik.values.questions}
                        type={TestQuestionListType.GRADE_TEST}
                        handleAssignMarks={handleAssignMarks}
                    />
                </Stack>
                {
                    show &&
                    <Box sx={{ width: "50%" }}>
                        <TestInstructions
                            instructions={instructions || ''}
                        />
                    </Box>
                }
            </Stack>

        </Box>
    )
}

const GradeTestSection = ({ formik, answerPaper }: { formik: any, answerPaper: any }) => {
    return (
        <Stack direction='row' spacing={3}>
            <GradeTestTable answerPaper={answerPaper} />
            <GradeTestForm formik={formik} />
        </Stack>
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

const RenderTabPanel = ({ page, answerPaper }: { page: number, answerPaper: any }) => {
    const { push } = useRouter();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            questions: [],
            gradedBy: answerPaper?.gradedBy || '',
            remark: answerPaper?.remark || '',
            marksObtained: answerPaper?.marksObtained || 0
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values: any) => {
            try {
                const submitData = { ...values, gradedBy: user._id }
                const response = await apiCallNResp(() => httpGradeTestAnswer(submitData, answerPaper._id));
                console.log(response);
                if (response.success) {
                    toast.success(response.message);
                    dispatch(fetchSelectedAnswerPaperAC({id: response.data._id}))
                    push("/Teacher/Test");
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    useEffect(() => {
        if (answerPaper?._id) {
            if (answerPaper?.questions.length) {
                let questions = JSON.parse(JSON.stringify(answerPaper.testPaperId.questions));
                let newQuestions = questions.map((question: any) => {
                    let ans = answerPaper.questions.filter((answer:any) => answer._id === question._id)[0];
                    if(ans) {
                        return {...question, answer: ans.answer, marksObtained: ans?.marksObtained || 0}
                    } else {
                        return {...question, answer: [''], marksObtained: ans?.marksObtained || 0}
                    }
                });
                formik.setFieldValue('questions', newQuestions);
            } else {
                let questions = JSON.parse(JSON.stringify(answerPaper.testPaperId.questions));
                let newQuestions = questions.map((question: any) => ({ ...question, answer: [''], marksObtained: 0 }));
                formik.setFieldValue('questions', newQuestions);
            }
        }
    }, [answerPaper]); // Don't add formik here

    if (page === 0) {
        return (<TestPaperSection formik={formik} instructions={answerPaper?.testPaperId?.instructions} />);
    } else if (page === 1) {
        return (<GradeTestSection formik={formik} answerPaper={answerPaper} />);
    } else {
        return (<></>);
    }
}


const GradeTestContainer = () => {
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

export default GradeTestContainer;