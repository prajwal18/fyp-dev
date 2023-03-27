import { useEffect, useState, useCallback } from "react";
import {
    Box, Stack, Button
} from '@mui/material';
import {
    TestTitle, HideInstructionsBtn,
    TestQuestions, TestInstructions
} from '../Common/TestCommonComponents';
import { TestQuestionListType, TypesOfQuestions } from "@/constants/Constants";
// Mock Data
import { MockTestData } from "@/constants/TempDataDeleteLater";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { useSelector } from "react-redux";
import { selectSelectedAnswerPaper } from "@/redux/test/test.slice";
import { httpUpdateTestAnswer } from "@/service/test.answer.service";
// Mock Data


const SaveNSubmitBtns = ({ formik }: { formik: any }) => {
    return (
        <Stack direction='row' gap={2}>
            <Button variant="contained" color="error"
                onClick={formik.handleSubmit}
            >
                Save and Continue...
            </Button>
            <Button variant="contained" color="error"
                onClick={formik.handleSubmit}
            >
                Save and Submit
            </Button>
        </Stack>
    );
}

const TakeTestContainer = () => {
    const answerPaper = useSelector(selectSelectedAnswerPaper);

    const formik = useFormik({
        initialValues: {
            questions: []
        },
        enableReinitialize: true,
        onSubmit: async (values: any) => {
            console.log(JSON.stringify(values));
            try {
                const response = await apiCallNResp(() => httpUpdateTestAnswer(values, answerPaper._id));
                if (response.success) {
                    toast.success(response.message);
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    const handleOnAnswer = (index: number) => {
        return (type: any) => {
            if([TypesOfQuestions.QNA , TypesOfQuestions.MCQ].includes(type)) {
                return (e:any) => {
                    let questions = JSON.parse(JSON.stringify(formik.values.questions));
                    questions.splice(index, 1, {...questions[index], answer: [e.target.value]});
                    formik.setFieldValue('questions', questions);
                }
            }
            else if (type === TypesOfQuestions.MCQ_CHOOSE_ALL) {
                return (e:any) => {
                    let questions = JSON.parse(JSON.stringify(formik.values.questions));
                    if(questions[index].answer.includes(e.target.value)){
                        let value = e.target.value;
                        let ansIdx = questions[index].answer.indexOf(value);
                        let answer = questions[index].answer;
                        answer.splice(ansIdx, 1);
                        questions.splice(index, 1, {...questions[index], answer: answer})
                    } else {
                        questions.splice(index, 1, {...questions[index], answer: [...questions[index].answer, e.target.value]});
                    }
                    formik.setFieldValue('questions', questions);
                }
            } else {
                return (e:any) => {
                    console.log('Why am i here?');
                }
            }
        }
    }

    useEffect(() => {
        if (answerPaper?._id) {
            if (answerPaper?.questions.length) {
                formik.setFieldValue('questions', answerPaper.questions);
            } else {
                let questions = JSON.parse(JSON.stringify(answerPaper.testPaperId.questions));
                let newQuestions = questions.map((question: any) => ({ ...question, answer: [] }));
                formik.setFieldValue('questions', newQuestions);
            }
        }
    }, [answerPaper]); // Don't add formik here

    const [show, setShow] = useState(true);
    return (
        <>
            {
                answerPaper._id &&
                <Stack
                    sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
                    direction='row'
                    alignItems='flex-start'
                >
                    <Box sx={{ padding: "20px", minWidth: "50%", width: "100%" }}>
                        <TestTitle
                            title={answerPaper.testPaperId.title}
                            teacher={answerPaper.testPaperId.createdBy.name}
                            date={answerPaper.testPaperId.releaseDate}
                        />
                        <Box mt={1} mb={3}>
                            <HideInstructionsBtn show={show} setShow={setShow} />
                        </Box>
                        <Stack direction='row' gap={2}>
                            <Stack spacing={2} sx={{ width: "100%" }}>
                                <TestQuestions
                                    testQuestions={formik.values?.questions || []}
                                    type={TestQuestionListType.TAKE_TEST}
                                    handleOnAnswer={handleOnAnswer}
                                />
                                <SaveNSubmitBtns formik={formik} />
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
                </Stack>
            }
        </>
    )
}

export default TakeTestContainer;