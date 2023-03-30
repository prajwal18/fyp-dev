import React, { useState } from "react";
import parse from 'html-react-parser';
import {
    Typography, Box, TextField,
    FormControl, RadioGroup, Radio,
    FormControlLabel, FormGroup,
    Checkbox, Stack, Button,
    Table, TableContainer, TableBody,
    TableCell
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
// MUI Icons
import { TypesOfQuestions, TestQuestionListType } from '@/constants/Constants';
import { BoldTableCell, BorderedBox, BWTableRow, DarkBtn } from "@/components/Common/styled/StyledComponents";
import { UpdateTestModal } from "./CreateTestModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedTestPaperAC } from "@/redux/test/actions";
import { useRouter } from "next/router";
import { GenerateCustTextArea, GenerateCustTextField } from "@/components/Common/form/CustTextFieldNErrorMsg";

export const TestTitleViewEdit = ({ formik, testData }: { formik: any, testData: any }) => {
    const [proceed, setProceed] = useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { query } = useRouter();
    const handleOpen = () => {
        if (typeof query.id === 'string' && query.id !== '') {
            dispatch(fetchSelectedTestPaperAC({ id: query.id }));
            setProceed(true);
        }
        setOpen(true);
    };

    return (
        <>
            <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
                <Stack direction='row' spacing={3} justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>{testData.title}</Typography>
                        <Typography sx={{ fontSize: "0.9rem", my: 1 }}>{testData.createdBy.name} &middot; {testData.releaseDate.split("T")[0]}</Typography>
                    </Box>

                    <Stack sx={{
                        justifyContent: 'center', alignItems: 'center', padding: '20px', background: 'rgba(28, 175, 229, 0.1)', borderRadius: "50%",
                        cursor: 'pointer', '&:hover': { background: 'rgba(28, 175, 229, 0.5)' }, '&:active': { background: 'rgba(28, 175, 229, 0.7)' }
                    }}
                        onClick={handleOpen}
                    >
                        <EditIcon />
                    </Stack>

                </Stack>
            </Box>
            {
                proceed && testData?._id &&
                <UpdateTestModal
                    open={open}
                    setOpen={setOpen}
                    formik={formik}
                    testData={testData}
                />
            }
        </>
    );
}

export const TestTitle = ({ title, teacher, date }: { title: string, teacher: string, date: string }) => {
    return (
        <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>{title}</Typography>
            <Typography sx={{ fontSize: "0.9rem", my: 1 }}>{teacher} &middot; {date?.split("T")[0]}</Typography>
        </Box>
    );
}

const RenderGradedRadio = ({ choice, correctChoice, userAnswer }: { choice: string, correctChoice: Array<string>, userAnswer: Array<string> }) => {
    if (correctChoice.includes(choice)) {
        if (userAnswer.includes(choice)) {
            return (
                <Stack direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ padding: "10px" }}
                >
                    <FormControlLabel value="choice" control={<Radio />} label={choice} disabled checked={true} />
                    <CheckCircleIcon sx={{ color: "#81b21b" }} />
                </Stack>
            )
        } else {
            return (
                <Stack direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ padding: "10px" }}
                >
                    <FormControlLabel value="choice" control={<Radio />} label={choice} disabled />
                    <CheckCircleIcon sx={{ color: "#81b21b" }} />
                </Stack>
            )
        }
    } else if (userAnswer.includes(choice)) {
        return (
            <Stack direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ padding: "10px" }}
            >
                <FormControlLabel value="choice" control={<Radio />} label={choice} disabled checked={true} />
                <CancelIcon sx={{ color: "#AC0D0F" }} />
            </Stack>
        )

    } else {
        return (
            <Box sx={{ padding: "10px" }}>
                <FormControlLabel value="choice" control={<Radio />} label={choice} disabled />
            </Box>
        )
    }
}

const RenderGradedCheckbox = ({ choice, correctChoice, userAnswer }: { choice: string, correctChoice: Array<string>, userAnswer: Array<string> }) => {
    if (correctChoice.includes(choice)) {
        if (userAnswer.includes(choice)) {
            return (
                <Stack direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ padding: "10px" }}
                >
                    <FormControlLabel control={<Checkbox />} label={choice} disabled checked={true}/>
                    <CheckCircleIcon sx={{ color: "#81b21b" }} />
                </Stack>
            )
        } else {
            return (
                <Stack direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ padding: "10px" }}
                >
                    <FormControlLabel control={<Checkbox />} label={choice} disabled />
                    <CheckCircleIcon sx={{ color: "#81b21b" }} />
                </Stack>
            )
        }
    } else if (userAnswer.includes(choice)) {
        return (
            <Stack direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ padding: "10px" }}
            >
                <FormControlLabel control={<Checkbox />} label={choice} disabled checked={true}/>
                <CancelIcon sx={{ color: "#AC0D0F" }} />
            </Stack>
        )

    } else {
        return (
            <Box sx={{ padding: "10px" }}>
                <FormControlLabel control={<Checkbox />} label={choice} disabled />
            </Box>
        )
    }
}



const GradeNGradedAnswerSection = ({ question }: { question: any }) => {

    if (question.questionType === TypesOfQuestions.QNA) {
        return (
            <Box sx={{ padding: "10px" }}>
                <TextField
                    value={question?.answer?.[0]}
                    multiline fullWidth rows={3}
                    sx={{ background: "white", overflow: "hidden", borderRadius: "5px" }}
                    disabled
                />
            </Box>
        )
    }

    if (question.questionType === TypesOfQuestions.MCQ) {
        return (
            <Box sx={{ padding: "10px", mt: 1 }}>
                <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                        value={question.choices?.[0]}
                    >
                        {
                            question.choices && question.choices.map((choice: string, index: number) => (
                                <React.Fragment key={index}>
                                    <RenderGradedRadio choice={choice} correctChoice={question.correctAnswer} userAnswer={question.answer} />
                                </React.Fragment>
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </Box>
        );
    }

    if (question.questionType === TypesOfQuestions.MCQ_CHOOSE_ALL) {
        return (
            <Box sx={{ padding: "10px", mt: 1 }}>
                <FormGroup>
                    {
                        question.choices && question.choices.map((choice: string, index: number) => (
                            <React.Fragment key={index}>
                                <RenderGradedCheckbox choice={choice} correctChoice={question.correctAnswer} userAnswer={question.answer} />
                            </React.Fragment>
                        ))
                    }
                </FormGroup>
            </Box>
        );
    }

    return <></>

}
const AnswerSection = ({ question, handleOnAnswer }: { question: any, handleOnAnswer: any }) => {
    if (question.questionType === TypesOfQuestions.QNA) {
        return (
            <Box sx={{ padding: "10px" }}>
                <TextField placeholder="Your answer..."
                    multiline
                    fullWidth
                    value={question?.answer?.[0] || ''}
                    rows={3} sx={{ background: "white", overflow: "hidden", borderRadius: "5px" }}
                    onChange={handleOnAnswer(TypesOfQuestions.QNA)}
                />

            </Box>
        )
    }
    if (question.questionType === TypesOfQuestions.MCQ) {
        return (
            <Box sx={{ padding: "10px", mt: 1 }}>
                <FormControl>
                    <RadioGroup
                        value={question?.answer?.[0] || ''}
                        onChange={handleOnAnswer(TypesOfQuestions.MCQ)}
                    >
                        {
                            question.choices && question.choices.map((choice: string, index: number) => (
                                <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </Box>
        )
    }
    return (
        <Box sx={{ padding: "10px", mt: 1 }}>
            <FormGroup>
                {
                    question.choices && question.choices.map((choice: string, index: number) => (
                        <FormControlLabel
                            control={<Checkbox />} label={choice} key={index}
                            value={choice}
                            onChange={handleOnAnswer(TypesOfQuestions.MCQ_CHOOSE_ALL)}
                            checked={question?.answer && question.answer.includes(choice)}
                        />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export const TestQuestionContainer = ({ question, index, handleOnAnswer }: { question: any, index: number, handleOnAnswer: any }) => {
    return (
        <BorderedBox sx={{ background: "rgb(0 0 0 / 5%)", borderRadius: "5px" }}>
            <Box sx={{ padding: "20px 0px 5px 0px", borderBottom: "1px solid #CCCCCC" }}>
                <Typography sx={{ fontWeight: "700", fontSize: "1.1rem" }}>
                    {index}. {" "} {question.title}
                </Typography>
            </Box>
            <AnswerSection question={question} handleOnAnswer={handleOnAnswer} />
        </BorderedBox>
    )
}

export const TestQuestionContainerUpdatable = ({ question, index, handleEdit, handleRemove }: { question: any, index: number, handleEdit: () => void, handleRemove: () => void }) => {
    return (
        <BorderedBox sx={{ background: "rgb(0 0 0 / 5%)", borderRadius: "5px" }}>
            <Stack direction={'row'} alignItems='center' justifyContent={'space-between'}
                sx={{ padding: "20px 0px 5px 0px", borderBottom: "1px solid #CCCCCC" }}
            >
                <Typography sx={{ fontWeight: "700", fontSize: "1.1rem" }}>
                    {index}. {" "} {question.title}
                </Typography>

                <Stack direction='row' spacing={1}>
                    <Stack sx={{
                        justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'rgba(28, 175, 229, 0.1)', borderRadius: "50%",
                        cursor: 'pointer', '&:hover': { background: 'rgba(28, 175, 229, 0.5)' }, '&:active': { background: 'rgba(28, 175, 229, 0.7)' }
                    }}
                        onClick={handleEdit}
                    >
                        <EditIcon />
                    </Stack>
                    <Stack sx={{
                        justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'rgba(191, 16, 51, 0.1)', borderRadius: "50%",
                        cursor: 'pointer', '&:hover': { background: 'rgba(191, 16, 51, 0.5)' }, '&:active': { background: 'rgba(191, 16, 51, 0.7)' }
                    }}
                        onClick={handleRemove}
                    >
                        <CloseIcon />
                    </Stack>

                </Stack>

            </Stack>
            <AnswerSection question={question} handleOnAnswer={(value: any) => () => { }} />
        </BorderedBox>
    )
}

export const TestQuestionContainerGrade = ({ question, type, index, handleAssignMarks }: { question: any, type: TestQuestionListType, index: number, handleAssignMarks?: any }) => {
    return (
        <Box>
            <Stack direction='row' justifyContent='flex-end'>
            </Stack>
            <BorderedBox sx={{ background: "rgb(0 0 0 / 5%)", borderRadius: "5px" }}>
                <Stack direction='row' sx={{
                    padding: "20px 0px 5px 0px",
                    borderBottom: "1px solid #CCCCCC",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography sx={{ fontWeight: "700", fontSize: "1.1rem" }}>
                        {index}. {" "} {question.title}
                    </Typography>
                    <TextField
                        type="number"
                        label="Marks"
                        sx={{ width: "100px" }}
                        variant="standard"
                        value={question?.marksObtained || 0}
                        onChange={TestQuestionListType.GRADE_TEST ? (e:any) => handleAssignMarks(e.target.value) : () => { }}
                        disabled={TestQuestionListType.GRADED_TEST === type}
                    />
                </Stack>
                <GradeNGradedAnswerSection question={question} />
            </BorderedBox>
        </Box>
    );
}

export const TestQuestions = ({ testQuestions, type, handleOnAnswer, handleAssignMarks }: { testQuestions: Array<any>, type: TestQuestionListType, handleOnAnswer?: any, handleAssignMarks?: any }) => {
    const renderTestQuestions = (question: any, index: number) => {
        switch (type) {
            case TestQuestionListType.TAKE_TEST:
                return <TestQuestionContainer question={question} index={index + 1} handleOnAnswer={handleOnAnswer(index)} />;
            case TestQuestionListType.GRADE_TEST:
                return <TestQuestionContainerGrade
                    question={question}
                    index={index + 1}
                    type={TestQuestionListType.GRADE_TEST}
                    handleAssignMarks={handleAssignMarks(index)}
                />;
            case TestQuestionListType.GRADED_TEST:
                return <TestQuestionContainerGrade
                    question={question}
                    type={TestQuestionListType.GRADED_TEST}
                    index={index + 1}
                />;
            default:
                return <></>;
        }
    }
    return (
        <>
            {
                testQuestions.map((question: any, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                renderTestQuestions(question, index)
                            }
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

export const AddNewQuestion = ({ testQuestions, handleOpenMCQ, handleOpenQNA }: { testQuestions: Array<any>, handleOpenMCQ: () => void, handleOpenQNA: () => void }) => {
    return (
        <>
            <BorderedBox>
                <Typography sx={{ fontSize: "20px" }}>{(testQuestions.length + 1) + ") "} Question</Typography>

                <Stack spacing={2} direction="row" sx={{ padding: "10px 20px", mt: 2 }}>
                    <Button sx={{ minWidth: "300px", padding: "10px 20px !important" }} variant="outlined" onClick={handleOpenMCQ}>
                        <AddIcon />
                        <Typography sx={{ fontSize: "18px" }}>MCQ Multiple Choice Questions</Typography>
                    </Button>

                    <Button sx={{ minWidth: "300px", padding: "10px 20px !important" }} variant="outlined" onClick={handleOpenQNA}>
                        <AddIcon />
                        <Typography sx={{ fontSize: "18px" }}>Q&A Question and answers</Typography>
                    </Button>
                </Stack>
            </BorderedBox>
        </>
    )
}


export const TestInstructions = ({ instructions }: { instructions: string }) => {
    return (
        <BorderedBox sx={{ overflowX: "auto" }}>
            {
                parse(instructions)
            }
        </BorderedBox>
    )
}


export const HideInstructionsBtn = ({ show, setShow }: { show: boolean, setShow: (value: any) => void }) => {
    const handleClick = () => setShow(!show);
    return (
        <DarkBtn onClick={handleClick}>
            {
                show ?
                    <VisibilityIcon />
                    :
                    <VisibilityOffIcon />

            }
            <Typography>Hide Instructions</Typography>
        </DarkBtn>
    );
}


export const GradeTestForm = ({ formik }: { formik: any }) => {
    const handleCalculateTotal = () => {
        const questions = formik.values.questions;
        const marks = questions.map((question: any) => question.marksObtained);
        const totalMarks = marks.reduce((sum: number, current: number) => Number(sum) + Number(current), 0);
        formik.setFieldValue('marksObtained', totalMarks)
    }
    return (
        <BorderedBox sx={{ minWidth: "400px", alignSelf: "flex-start" }}>
            <Stack spacing={2}>
                <Typography sx={{ fontSize: "22px" }}>Grade Test</Typography>
                <Stack direction='row' spacing={2}>
                    <Button
                        color="primary" variant="outlined"
                        sx={{ fontSize: "0.7rem", whiteSpace: "nowrap", width: "200px" }}
                        onClick={handleCalculateTotal}
                    >
                        Calculate Total
                    </Button>
                    <GenerateCustTextField
                        formik={formik}
                        name='marksObtained'
                        label='Marks Obtained'
                        type='number'
                    />
                </Stack>
                <GenerateCustTextArea
                    formik={formik}
                    name='remark'
                    label='Leave a remark'
                    rows={3}
                />
                <Button color="primary" variant="contained" onClick={formik.handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </BorderedBox>
    );
}

export const GradeTestTable = ({ answerPaper }: { answerPaper: any }) => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>{answerPaper?.testPaperId?.courseId?.name}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Status</BoldTableCell>
                        {
                            answerPaper?.isGraded ?
                                <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                                :
                                <TableCell sx={{ color: "#1976D2", fontWeight: "700" }}>Pending</TableCell>
                        }
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submission Date</BoldTableCell>
                        <TableCell>{answerPaper.submissionDate.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submitted By</BoldTableCell>
                        <TableCell>{answerPaper?.submittedBy?.name}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Full Marks</BoldTableCell>
                        <TableCell>{answerPaper?.testPaperId?.fullMark}</TableCell>
                    </BWTableRow>

                    {
                        answerPaper?.isGraded &&
                        <>
                            <BWTableRow>
                                <BoldTableCell>Obtained Marks</BoldTableCell>
                                <TableCell>{answerPaper?.marksObtained}</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>Graded By</BoldTableCell>
                                <TableCell>{answerPaper?.gradedBy?.name}</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>{'Teacher\'s  Remark'}</BoldTableCell>
                                <TableCell>{answerPaper?.remark}</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>{'Message your Teacher'}</BoldTableCell>
                                <TableCell>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <Typography>{answerPaper?.gradedBy?.name}</Typography>
                                        <Button variant="text">
                                            <SendIcon color="info" />
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </BWTableRow>
                        </>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}