import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { TypesOfQuestions } from '@/constants/Constants';
import { AddQuestionPropType } from '@/constants/CustomTypes';


const QNAModal = ({ open, setOpen, testQuestions, setTestQuestions, setAddNewQuestion }: AddQuestionPropType) => {
    const [question, setQuestion] = useState("");

    const handleClose = () => {
        setQuestion("");
        setOpen(false);
        if (testQuestions.length >= 1) {
            setAddNewQuestion(false);
        }
    };

    const handleAdd = () => {
        const lastQuestion = testQuestions.length > 0 && testQuestions.reduce((max: any, current: any) => max.id > current.id ? max : current);
        const id = lastQuestion ? lastQuestion.id + 1 : 1;
        setTestQuestions([...testQuestions, {
            id: id, question, questionType: TypesOfQuestions.QNA
        }]);
        handleClose();
    }
    return (
        <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={false}>
            <DialogTitle sx={{ textAlign: "center" }}>{"New Q&A question"}</DialogTitle>

            <DialogContent sx={{ padding: "20px 30px", width: "600px" }}>
                <Stack spacing={2}>
                    <TextField
                        label="Add Title/Question"
                        variant="outlined"
                        value={question}
                        fullWidth
                        sx={{ mt: 3 }}
                        onChange={(e: any) => { setQuestion(e.target.value) }}
                        multiline
                        rows={2}
                    />
                    <TextField
                        label="Add Sub Title"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                    />
                    <TextField
                        label="Marks"
                        variant="outlined"
                        type="number"
                        fullWidth
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