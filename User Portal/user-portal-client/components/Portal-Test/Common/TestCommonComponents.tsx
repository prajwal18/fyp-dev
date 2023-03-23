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
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
// MUI Icons
import { TypesOfQuestions, TestQuestionListType } from '@/constants/Constants';
import { BoldTableCell, BorderedBox, BWTableRow, DarkBtn } from "@/components/Common/styled/StyledComponents";
import { UpdateTestModal } from "./CreateTestModal";

export const TestTitleViewEdit = ({ formik, testData }: { formik: any, testData: any }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };

    return (
        <>
            <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
                <Stack direction='row' spacing={3} justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>Test 2: Psychology</Typography>
                        <Typography sx={{ fontSize: "0.9rem", my: 1 }}>Mero Raja Pradhan &middot; 8<sup>th</sup> January</Typography>
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
            <UpdateTestModal
                open={open}
                setOpen={setOpen}
                formik={formik}
                testData={testData}
            />
        </>
    );
}

export const TestTitle = () => {
    return (
        <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>Test 2: Psychology</Typography>
            <Typography sx={{ fontSize: "0.9rem", my: 1 }}>Mero Raja Pradhan &middot; 8<sup>th</sup> January</Typography>
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
                    <FormControlLabel value="choice" control={<Radio />} label={choice} disabled />
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
                <FormControlLabel value="choice" control={<Radio />} label={choice} disabled />
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
                    <FormControlLabel control={<Checkbox />} label={choice} disabled />
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
                <FormControlLabel control={<Checkbox />} label={choice} disabled />
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
                    placeholder="Your answer..."
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
                        defaultValue={question.choices?.[0]}
                    >
                        {
                            question.choices && question.choices.map((choice: string, index: number) => (
                                <React.Fragment key={index}>
                                    <RenderGradedRadio choice={choice} correctChoice={question.correctChoice} userAnswer={question.yourAnswer} />
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
                                <RenderGradedCheckbox choice={choice} correctChoice={question.correctChoice} userAnswer={question.yourAnswer} />
                            </React.Fragment>
                        ))
                    }
                </FormGroup>
            </Box>
        );
    }

    return <></>

}
const AnswerSection = ({ question }: { question: any }) => {
    if (question.questionType === TypesOfQuestions.QNA) {
        return (
            <Box sx={{ padding: "10px" }}>
                <TextField placeholder="Your answer..."
                    multiline fullWidth rows={3} sx={{ background: "white", overflow: "hidden", borderRadius: "5px" }} />

            </Box>
        )
    }
    if (question.questionType === TypesOfQuestions.MCQ) {
        return (
            <Box sx={{ padding: "10px", mt: 1 }}>
                <FormControl>
                    <RadioGroup
                        defaultValue={question.choices?.[0]}
                    >
                        {
                            question.choices && question.choices.map((choice: string, index: number) => (
                                <FormControlLabel key={index} value="choice" control={<Radio />} label={choice} />
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
                        <FormControlLabel control={<Checkbox />} label={choice} key={index} />
                    ))
                }
            </FormGroup>
        </Box>
    )
}

export const TestQuestionContainer = ({ question }: { question: any }) => {
    return (
        <BorderedBox sx={{ background: "rgb(0 0 0 / 5%)", borderRadius: "5px" }}>

            <Box sx={{ padding: "20px 0px 5px 0px", borderBottom: "1px solid #CCCCCC" }}>
                <Typography sx={{ fontWeight: "700", fontSize: "1.1rem" }}>
                    {question.id}. {" "} {question.question}
                </Typography>
            </Box>
            <AnswerSection question={question} />
        </BorderedBox>
    )
}

export const TestQuestionContainerGrade = ({ question, type }: { question: any, type: TestQuestionListType }) => {
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
                        {question.id}. {" "} {question.question}
                    </Typography>
                    <TextField
                        type="number"
                        label="Marks"
                        sx={{ width: "100px" }}
                        variant="standard"
                        value={TestQuestionListType.GRADED_TEST === type ? question.marksObtained : 0}
                        disabled={TestQuestionListType.GRADED_TEST === type}
                    />
                </Stack>
                <GradeNGradedAnswerSection question={question} />
            </BorderedBox>
        </Box>
    );
}

export const TestQuestions = ({ testQuestions, type }: { testQuestions: Array<any>, type: TestQuestionListType }) => {
    const renderTestQuestions = (question: any) => {
        switch (type) {
            case TestQuestionListType.TAKE_TEST:
                return <TestQuestionContainer question={question} />;
            case TestQuestionListType.GRADE_TEST:
                return <TestQuestionContainerGrade question={question} type={TestQuestionListType.GRADE_TEST} />;
            case TestQuestionListType.GRADED_TEST:
                return <TestQuestionContainerGrade question={question} type={TestQuestionListType.GRADED_TEST} />;
            default:
                return <></>;
        }
    }
    return (
        <>
            {
                testQuestions.map((question: any) => {
                    return (
                        <React.Fragment key={question.id}>
                            {
                                renderTestQuestions(question)
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


export const GradeTestForm = () => {
    return (
        <BorderedBox sx={{ minWidth: "400px", alignSelf: "flex-start" }}>
            <Stack spacing={2}>
                <Typography sx={{ fontSize: "22px" }}>Grade Test</Typography>
                <Stack direction='row' spacing={2}>
                    <Button color="primary" variant="outlined" sx={{ fontSize: "0.9rem", whiteSpace: "nowrap", width: "200px" }}>
                        Calculate Total
                    </Button>
                    <TextField label="Marks Obtained" type="number" />
                </Stack>
                <TextField multiline rows={3} label="Leave a reamrk" />
                <Button color="primary" variant="contained">
                    Submit
                </Button>
            </Stack>
        </BorderedBox>
    );
}

export const GradeTestTable = ({ isGraded }: { isGraded: boolean }) => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>Computer Science</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Status</BoldTableCell>
                        {
                            isGraded ?
                                <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                                :
                                <TableCell sx={{ color: "#1976D2", fontWeight: "700" }}>Pending</TableCell>
                        }
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submission Date</BoldTableCell>
                        <TableCell>11<sup>th</sup> November 2022</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submitted By</BoldTableCell>
                        <TableCell>Prajwal Gautam</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Full Marks</BoldTableCell>
                        <TableCell>100</TableCell>
                    </BWTableRow>

                    {
                        isGraded &&
                        <>
                            <BWTableRow>
                                <BoldTableCell>Obtained Marks</BoldTableCell>
                                <TableCell>88</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>Graded By</BoldTableCell>
                                <TableCell>Mero Raja Pradhan</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>{'Teacher\'s  Remark'}</BoldTableCell>
                                <TableCell>You have been making great progress. Keep it up.</TableCell>
                            </BWTableRow>
                            <BWTableRow>
                                <BoldTableCell>{'Message your Teacher'}</BoldTableCell>
                                <TableCell>
                                    <Stack direction='row' alignItems='center' gap={1}>
                                        <Typography>Mero Raja Pradhan</Typography>
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