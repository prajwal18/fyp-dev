import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

//MUI ICONS
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//MUI ICONS

//MUI Radio and checkbox
import Radio from '@mui/material/Radio'; 
import Checkbox from '@mui/material/Checkbox'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
//MUI Radio and checkbox

import { CustStack, CustTypography, CustButton } from "../Common/ContainersNButtons";
import DashLayout from "../Layout/DashLayout/DashLayout";
import { ReadLessonSection } from "./ReadLessonPage";
import { testData, TestDataType, QuestionTypes } from "./MockData/TestData";
import { ReadLessonData } from "./MockData/ReadLessonMock";


const ButtonContainer = () => {
    return(
        <Stack sx={{mt: 2, gap:"10px"}} direction="row">
            <Button sx={{textTransform:"capitalize"}} variant="contained" color="error">
                Save and continue later
            </Button>
            <Button sx={{textTransform:"capitalize"}} variant="contained" color="error">
                Save and submit
            </Button>
        </Stack>
    )
}

const AnswerSection = ({ question }: { question: TestDataType }) => {
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

export const TestQuestionContainer = ({ question }: { question: TestDataType }) => {
    return (
        <Box sx={{ padding: "1rem", borderRadius: "10px", background: "#EBECF2" }}>
            <Box sx={{ padding: "20px 0px 5px 0px", borderBottom: "1px solid #CCCCCC" }}>
                <CustTypography sx={{ fontWeight: "700" }}>
                    {question.id}. {" "} {question.question}
                </CustTypography>
            </Box>
            <AnswerSection question={question} />
        </Box>
    )
}

const TestSection = ({ showLesson, handleShow }: { showLesson: boolean, handleShow: () => void }) => {
    return (
        <Box sx={{ width: "100%", background: "white" }}>
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>1. First Term Science Examination</CustTypography>
            <CustButton onClick={handleShow} sx={{ color: "white", ml: 3, mt: 1 }}>
                {
                    showLesson ?
                        <VisibilityIcon /> :
                        <VisibilityOffIcon />
                }
                <span>Hide examination</span>
            </CustButton>
            <Stack spacing={2} sx={{ marginTop: "30px" }}>
                {
                    testData.map((item: TestDataType) => {
                        return (
                            <React.Fragment key={item.id}>
                                <TestQuestionContainer question={item} />
                            </React.Fragment>
                        )
                    })
                }
            </Stack>
            <ButtonContainer />
        </Box>
    )
}

const TakeTestContainer = () => {
    const [showLesson, setShowLesson] = useState(true);
    const handleShow = () => {
        setShowLesson(!showLesson);
    }
    return (
        <CustStack direction="row" sx={{ padding: "0px" }}>
            <TestSection showLesson={showLesson} handleShow={handleShow} />
            {
                showLesson &&
                <>
                    <Box></Box> {/* To add extra spacing */}
                    <ReadLessonSection columnCount={1} instructionData={ReadLessonData} />
                </>
            }
        </CustStack>
    );
}
const TakeTestPage = () => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <TakeTestContainer />
            </Box>
        </DashLayout>
    )
}

export default TakeTestPage;