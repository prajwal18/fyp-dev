import React, { useState } from 'react';
import { Box, Stack, Typography } from "@mui/material";
import DashLayout from '../../Layout/DashLayout/DashLayout';
import { CustTypography, CustButton } from '../../Common/ContainersNButtons';
import { SelectSubject } from '@/components/Common/FormComponents';
import TextField from '@mui/material/TextField/TextField';
//Test Data types and questions types
import { TestDataType } from "../../Students/MockData/TestData";
import { TestQuestionContainer } from "../../Students/TakeTestPage";
import { ReadLessonDataType } from '@/components/Students/MockData/ReadLessonMock';
//Test Data types and questions types
import QAndAModal from './QAndAModal';
import MCQModal from './MCQModal';
import { ReadLessonSection } from '@/components/Students/ReadLessonPage';

//MUI ICONS
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReadLessonModal from './ReadLessonModal';
//MUI ICONS

type AddInstructionPropType = {
  instructionData: Array<ReadLessonDataType>,
  setInstructionData: (value: any) => void
}
const AddInstructionSection = ({ instructionData, setInstructionData }: AddInstructionPropType) => {
  const [showLesson, setShowLesson] = useState(false);
  const toggleShow = () => setShowLesson(!showLesson);
  // Open Add Instruction Modal/Dialogue
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <Box sx={{ mt: 3 }}>
        {
          instructionData.length > 0 ?
            <>
              <CustButton onClick={toggleShow} sx={{ color: "white", ml: 3, mt: 2, mb: 2 }}>
                {
                  showLesson ?
                    <VisibilityIcon /> :
                    <VisibilityOffIcon />
                }
                <span>Hide examination</span>
              </CustButton>
              {
                showLesson && <ReadLessonSection columnCount={1} instructionData={instructionData} />
              }
              
            </>
            :
            <></>
        }
        <CustButton sx={{ minWidth: "100%", padding: "10px 20px !important", color: "white" }} onClick={handleOpen}>
              <AddIcon />
              <Typography sx={{ fontSize: "18px" }}>Add Test Instruction</Typography>
            </CustButton>
      </Box>
      {/* Instruction Dialogue/Modal */}
      <ReadLessonModal
        open={open}
        setOpen={setOpen}
        instructionData={instructionData}
        setInstructionData={setInstructionData}
      />
    </>
  )
}

const CreateTestPageContainer = () => {
  const [instructionData, setInstructionData] = useState<Array<ReadLessonDataType>>([]);
  const [testQuestions, setTestQuestions] = useState<Array<TestDataType>>([]);
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
    <>
      <Box sx={{ background: "white", padding: "30px 20px" }}>
        <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Create New Tests</CustTypography>
        <Box sx={{ maxWidth: "550px", mt: 3 }}>
          <SelectSubject />
        </Box>

        <Stack sx={{ maxWidth: "550px", mt: 3 }} direction="row" spacing={2}>
          <TextField label="Test Name" variant="outlined" fullWidth />
        </Stack>

        <Stack sx={{ maxWidth: "550px", justifyContent: "space-between", padding: "10px 20px" }} direction="row" spacing={4}>
          <TextField label="Total Marks" variant="standard" />
          <TextField label=" No. of Questions" variant="standard" />
        </Stack>

        {/* Instruction Section */}
        <AddInstructionSection instructionData={instructionData} setInstructionData={setInstructionData} />
        {/* Instruction Section */}

        {/* Test Section Starts From HERE */}
        <Stack spacing={2} sx={{ mt: 5 }}>
          <>
            {
              testQuestions.map((question: TestDataType) => (
                <React.Fragment key={question.id}>
                  <TestQuestionContainer question={question} />
                </React.Fragment>
              ))
            }
          </>
          {
            addNewQuestion ?
              <Box sx={{ padding: "20px", borderRadius: "10px", border: "1px solid grey" }}>
                <CustTypography sx={{ fontSize: "20px" }}>{(testQuestions.length + 1) + ") "} Question</CustTypography>

                <Stack spacing={2} direction="row" sx={{ padding: "10px 20px" }}>
                  <CustButton sx={{ minWidth: "300px", padding: "10px 20px !important", color: "white" }} onClick={handleOpenMCQ}>
                    <AddIcon />
                    <Typography sx={{ fontSize: "18px" }}>MCQ (One Correct answer) </Typography>
                  </CustButton>

                  <CustButton sx={{ minWidth: "300px", padding: "10px 20px !important", color: "white" }} onClick={handleOpenQNA}>
                    <AddIcon />
                    <Typography sx={{ fontSize: "18px" }}>Q&A (question and answers)</Typography>
                  </CustButton>
                </Stack>

              </Box>
              :
              <></>
          }
          <CustButton sx={{ minWidth: "100%", padding: "10px 20px !important", color: "white" }} onClick={handleAddNewQuestion}>
            <AddIcon />
            <Typography sx={{ fontSize: "18px" }}>Add another question</Typography>
          </CustButton>

        </Stack>
        {/* Test Section Starts From HERE */}
      </Box>
      {
        toOpen === "Q&A" ?
          <QAndAModal open={open} setOpen={setOpen} testQuestions={testQuestions} setTestQuestions={setTestQuestions} setAddNewQuestion={setAddNewQuestion} />
          :
          <MCQModal open={open} setOpen={setOpen} testQuestions={testQuestions} setTestQuestions={setTestQuestions} setAddNewQuestion={setAddNewQuestion} />
      }
    </>
  )
}

const CreateTestPage = () => {
  return (
    <DashLayout>
      <Box sx={{ padding: "20px" }}>
        <CreateTestPageContainer />
      </Box>
    </DashLayout>
  )
}


export default CreateTestPage;