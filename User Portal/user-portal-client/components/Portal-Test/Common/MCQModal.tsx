import React, { useEffect, useState } from 'react';
import {
    Button, Checkbox, Box, Dialog,
    DialogActions, DialogContent, DialogTitle,
    FormControl, FormControlLabel, FormLabel, Radio,
    RadioGroup, Stack, TextField
} from '@mui/material';
import { toast } from "react-toastify";
import { MCQType, TypesOfQuestions } from '@/constants/Constants';
import { AddQuestionPropType } from '@/constants/CustomTypes';
import { ErrorMessage, GenerateCustTextArea, GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';


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
                <FormControlLabel value={MCQType.CHOOSE_ALL} control={<Radio />} label="Select many" />
            </RadioGroup>
        </FormControl>
    )
}

const SelectCorrectAnswer = ({ choices, mcqType, handleRemove, formik }: { choices: Array<string>, mcqType: MCQType, handleRemove: (index: number) => void, formik: any }) => {
    // const [correctAnswers, setCorrectAnswer] = useState<Array<string>>([]);
    const [mcqChoices, setMcqChoices] = useState<Array<any>>([]);
    const handleMCQChoiceCheck = (index: number) => {
        console.log(index)
        let newMCQChoices = JSON.parse(JSON.stringify(mcqChoices));
        newMCQChoices.splice(index, 1, { ...mcqChoices[index], checked: !mcqChoices[index].checked });
        setMcqChoices(newMCQChoices);
        formik.setFieldValue("correctAnswer", newMCQChoices.filter((item: any) => item.checked).map((item: any) => item.choice));
    }

    useEffect(() => {
        let newChoices = choices.map(choice => ({ choice: choice, checked: formik.values.correctAnswer.includes(choice) }));
        setMcqChoices(newChoices);
    }, [choices]);

    useEffect(() => {
        
    }, [mcqType, choices])

    return (
        <FormControl>
            <FormLabel id="select-mcq-type">Select correct answer/s for the question.</FormLabel>
            {
                mcqType === MCQType.CHOOSE_ONE ?
                    <RadioGroup
                        aria-labelledby="select-mcq-type-answer"
                        name="mcq-answer"
                        onChange={(e: any) => { formik.setFieldValue("correctAnswer", [e.target.value]) }}
                    >
                        {
                            choices.map((choice: string, index: number) => (
                                <Stack direction='row' spacing={2} key={index}>
                                    <FormControlLabel value={choice} checked={formik.values.correctAnswer.includes(choice)} control={<Radio />} label={choice} />
                                    <Button onClick={() => handleRemove(index)} color='error'>
                                        X
                                    </Button>
                                </Stack>
                            ))
                        }
                    </RadioGroup>
                    :
                    <>
                        {
                            mcqChoices.map((choice: any, index: number) => {
                                console.log(choice, index);
                                return (
                                    <Stack direction='row' spacing={2} key={index}>
                                        <FormControlLabel
                                            checked={choice.checked}
                                            control={<Checkbox />} label={choice.choice}
                                            onChange={() => handleMCQChoiceCheck(index)}
                                        />
                                        <Button onClick={() => handleRemove(index)} color='error'>
                                            X
                                        </Button>
                                    </Stack>
                                )
                            })
                        }
                    </>
            }
        </FormControl>
    )
}

const MCQModal = ({ open, formik, handleClose }: AddQuestionPropType) => {
    const [choice, setChoice] = useState('');
    const handleSetMCQType = (data: string) => {
        formik.setFieldValue('questionType', data);
        formik.setFieldValue('correctAnswer', []);
    }
    const handleAddChoice = (e: any) => {
        e.preventDefault();
        if (choice !== '') {
            const choices = JSON.parse(JSON.stringify(formik.values.choices));
            formik.setFieldValue("choices", [...choices, choice]);
            formik.setFieldValue('correctAnswer', []);
            setChoice('');
        } else {
            toast.error("Provide a valid value for choice");
        }
    }
    const handleRemoveChoice = (index: number) => {
        const choices = JSON.parse(JSON.stringify(formik.values.choices));;
        choices.splice(index, 1);
        formik.setFieldValue("choices", choices);
        formik.setFieldValue("correctAnswer", []);
    }
    return (
        <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={false}>
            <DialogTitle sx={{ textAlign: "center" }}>{"New MCQ question"}</DialogTitle>

            <DialogContent sx={{ padding: "20px 30px", width: "600px" }}>
                <Box>
                    <SelectMCQType
                        mcqType={formik.values.questionType}
                        setMcqType={handleSetMCQType}
                    />
                    {formik.touched?.questionType && formik.errors.questionType && <ErrorMessage message={formik.errors.questionType} />}
                </Box>
                <Box sx={{ mt: 3 }}>
                    <GenerateCustTextArea
                        formik={formik}
                        name='title'
                        label='Add Title/Question'
                        rows={2}
                    />
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <GenerateCustTextField
                            formik={formik}
                            name='marks'
                            label='Marks'
                        />
                    </Stack>

                    <Box>
                        <Stack direction="row" spacing={2} component="form" onSubmit={handleAddChoice} sx={{ mt: 3 }}>
                            <TextField label="Add Choice" fullWidth variant='outlined' value={choice} onChange={(e: any) => setChoice(e.target.value)} />
                            <Button color="success" type="submit" variant='contained'>Add</Button>
                        </Stack>
                        {formik.touched?.choices && formik.errors.choices && <ErrorMessage message={formik.errors.choices} />}
                    </Box>

                    {
                        formik.values.choices.length > 0 &&
                        <Box sx={{ mt: 3 }}>
                            <SelectCorrectAnswer
                                mcqType={formik.values.questionType} choices={formik.values.choices}
                                handleRemove={handleRemoveChoice} formik={formik}
                            />
                            {formik.touched?.correctAnswer && formik.errors.correctAnswer && <ErrorMessage message={formik.errors.correctAnswer} />}
                        </Box>
                    }

                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">Close</Button>
                <Button onClick={formik.handleSubmit} color="success" variant='outlined'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MCQModal;