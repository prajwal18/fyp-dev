import React, { useState } from 'react';
import {
    Button, Checkbox, Box, Dialog,
    DialogActions, DialogContent, DialogTitle,
    FormControl, FormControlLabel, FormLabel, Radio,
    RadioGroup, Stack, TextField
} from '@mui/material';
import { MCQType } from '@/constants/Constants';
import { AddQuestionPropType } from '@/constants/CustomTypes';


const SelectMCQType = ({ mcqType, setMcqType }: { mcqType: MCQType, setMcqType: (value: any) => void }) => {

    return (
        <FormControl>
            <FormLabel id="select-mcq-type">Select MCQ Question type</FormLabel>
            <RadioGroup
                aria-labelledby="select-mcq-type"
                value={mcqType}
                onChange={(e: any) => { setMcqType(e.target.value) }}
                name="radio-buttons-group"
            >
                <FormControlLabel value={MCQType.CHOOSE_ONE} control={<Radio />} label="Select one" />
                <FormControlLabel value={MCQType.CHOOSE_ALL} control={<Radio />} label="Select all" />
            </RadioGroup>
        </FormControl>
    )
}

const SelectCorrectAnswer = ({ choices, mcqType }: { choices: Array<string>, mcqType: MCQType }) => {
    return (
        <FormControl>
            <FormLabel id="select-mcq-type">Select MCQ Correct Answer type</FormLabel>
            {
                mcqType === MCQType.CHOOSE_ONE ?
                    <RadioGroup
                        aria-labelledby="select-mcq-type-answer"
                        name="mcq-answer"
                    >
                        {
                            choices.map((choice: string, index: number) => (
                                <FormControlLabel key={index} value={choice} control={<Radio />} label={choice} />
                            ))
                        }
                    </RadioGroup>
                    :
                    <>
                        {
                            choices.map((choice: string, index: number) => (
                                <FormControlLabel key={index} value={choice} control={<Checkbox />} label={choice} />
                            ))
                        }
                    </>
            }
        </FormControl>
    )
}

const MCQModal = ({ open, setOpen, testQuestions, setTestQuestions, setAddNewQuestion }: AddQuestionPropType) => {
    const [mcqType, setMcqType] = useState(MCQType.CHOOSE_ONE);

    const [question, setQuestion] = useState("");
    const [choiceText, setChoiceText] = useState("");
    const [choices, setChoices] = useState<Array<string>>([]);

    const handleClose = () => {
        setQuestion("");
        setChoiceText("");
        setChoices([]);
        setOpen(false);
        if (testQuestions.length >= 1) {
            setAddNewQuestion(false);
        }
    };

    const handleAddChoice = (e: any) => {
        e.preventDefault();
        setChoices([...choices, choiceText]);
        setChoiceText("");
    }

    const handleAdd = () => {
        const lastQuestion = testQuestions.length > 0 && testQuestions.reduce((max: any, current: any) => max.id > current.id ? max : current);
        const id = lastQuestion ? lastQuestion.id + 1 : 1;
        setTestQuestions([...testQuestions, {
            id: id, question, questionType: mcqType, choices
        }]);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={false}>
            <DialogTitle sx={{ textAlign: "center" }}>{"New MCQ question"}</DialogTitle>

            <DialogContent sx={{ padding: "20px 30px", width: "600px" }}>
                <SelectMCQType mcqType={mcqType} setMcqType={setMcqType} />
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Add Title/Question"
                        variant="outlined"
                        fullWidth
                        value={question}
                        onChange={(e: any) => { setQuestion(e.target.value) }}
                    />
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <TextField
                            label="Add Sub Title"
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Marks"
                            variant="outlined"
                            type="number"
                        />
                    </Stack>

                    <Stack direction="row" spacing={2} component="form" onSubmit={handleAddChoice} sx={{ mt: 3 }}>
                        <TextField label="Add Choice" fullWidth variant='outlined' value={choiceText} onChange={(e: any) => setChoiceText(e.target.value)} />
                        <Button color="success" type="submit" variant='contained'>Add</Button>
                    </Stack>
                    {
                        choices.length > 0 &&
                        <Box sx={{ mt: 3 }}>
                            <SelectCorrectAnswer mcqType={mcqType} choices={choices} />
                        </Box>
                    }

                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">Close</Button>
                <Button onClick={handleAdd} color="success" variant='outlined'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MCQModal;