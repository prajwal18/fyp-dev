import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { QuestionTypes } from '@/constants/Constants';
import { AddQuestionPropType } from '@/constants/CustomTypes';


const QNAModal = ({ open, setOpen, testQuestions, setTestQuestions, setAddNewQuestion }: AddQuestionPropType) => {
    const [question, setQuestion] = useState("");

    const handleClose = () => {
        setQuestion("");
        setOpen(false);
        setAddNewQuestion(false);
    };

    const handleAdd = () => {
        const lastQuestion = testQuestions.length > 0 && testQuestions.reduce((max: any, current: any) => max.id > current.id ? max : current);
        const id = lastQuestion?.id ? lastQuestion.id + 1 : 1;
        setTestQuestions([...testQuestions, {
            id: id, question, questionType: QuestionTypes.QNA
        }]);
        handleClose();
    }
    return (
        <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={true}>
            <DialogTitle sx={{ textAlign: "center" }}>{"New Q&A question"}</DialogTitle>

            <DialogContent sx={{ padding: "20px 30px" }}>
                <TextField
                    label="Add Title/Question"
                    variant="outlined"
                    value={question}
                    fullWidth
                    sx={{ mt: 3 }}
                    onChange={(e: any) => { setQuestion(e.target.value) }}
                />

                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
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
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">Close</Button>
                <Button onClick={handleAdd} color="success" variant='outlined'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default QNAModal