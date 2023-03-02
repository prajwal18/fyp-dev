import React from "react";
import {
    Typography, Box, TextField,
    FormControl, RadioGroup, Radio,
    FormControlLabel, FormGroup,
    Checkbox, Stack
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
// MUI Icons
import { QuestionTypes } from '@/constants/Constants';
import { AddBtn } from "@/components/Common/styled/StyledComponents";

export const TestTitle = () => {
    return (
        <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>Test 2: Psychology</Typography>
            <Typography sx={{ fontSize: "0.9rem", my: 1 }}>Mero Raja Pradhan &middot; 8<sup>th</sup> January</Typography>
        </Box>
    );
}
const AnswerSection = ({ question }: { question: any }) => {
    if (question.questionType === QuestionTypes.QNA) {
        return (
            <Box sx={{ padding: "10px" }}>
                <TextField placeholder="Your answer..."
                    multiline fullWidth rows={3} sx={{ background: "white", overflow: "hidden", borderRadius: "5px" }} />

            </Box>
        )
    }
    if (question.questionType === QuestionTypes.MCQ) {
        return (
            <Box sx={{ padding: "10px" }}>
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
        <Box sx={{ padding: "10px" }}>
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
        <Box sx={{ padding: "1rem", borderRadius: "10px", background: "#EBECF2" }}>
            <Box sx={{ padding: "20px 0px 5px 0px", borderBottom: "1px solid #CCCCCC" }}>
                <Typography sx={{ fontWeight: "700" }}>
                    {question.id}. {" "} {question.question}
                </Typography>
            </Box>
            <AnswerSection question={question} />
        </Box>
    )
}

export const TestQuestions = ({ testQuestions }: { testQuestions: Array<any> }) => {
    return (
        <>
            {
                testQuestions.map((question: any) => {
                    <React.Fragment key={question.id}>
                        <TestQuestionContainer question={question} />
                    </React.Fragment>
                })
            }
        </>
    )
}

export const AddNewQuestion = ({ testQuestions, handleOpenMCQ, handleOpenQNA }: { testQuestions: Array<any>, handleOpenMCQ: () => void, handleOpenQNA: () => void }) => {
    return (
        <Box sx={{ padding: "20px", borderRadius: "10px", border: "1px solid grey" }}>
            <Typography sx={{ fontSize: "20px" }}>{(testQuestions.length + 1) + ") "} Question</Typography>

            <Stack spacing={2} direction="row" sx={{ padding: "10px 20px" }}>
                <AddBtn sx={{ minWidth: "300px", padding: "10px 20px !important", color: "white" }} onClick={handleOpenMCQ}>
                    <AddIcon />
                    <Typography sx={{ fontSize: "18px" }}>MCQ (One Correct answer) </Typography>
                </AddBtn>

                <AddBtn sx={{ minWidth: "300px", padding: "10px 20px !important", color: "white" }} onClick={handleOpenQNA}>
                    <AddIcon />
                    <Typography sx={{ fontSize: "18px" }}>Q&A (question and answers)</Typography>
                </AddBtn>
            </Stack>

        </Box>
    )
}
