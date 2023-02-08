import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Box } from '@mui/material';
import { ReadLessonDataType } from '@/components/Students/MockData/ReadLessonMock';
import { ReadLessonSection } from '@/components/Students/ReadLessonPage';


type ReadLessonPropType = {
    open: boolean, setOpen: (value: any) => void,
    instructionData: Array<ReadLessonDataType>,
    setInstructionData: (value: any) => void

}
const ReadLessonModal = ({ open, setOpen, instructionData, setInstructionData }: ReadLessonPropType) => {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [instruction, setInstruction] = useState("");

    const handleClose = () => {
        setTitle("");
        setInstruction("");
        setSubTitle("");
        setOpen(false);
    };

    const handleAdd = () => {
        const lastInstruction = instructionData.length > 0 && instructionData.reduce((max: any, current: any) => max.id > current.id ? max : current);
        const id = (lastInstruction && lastInstruction.id) ? lastInstruction.id + 1 : 1;
        if (subTitle === "") {
            setInstructionData([
                ...instructionData, {
                    id, title, content: instruction
                }
            ])
        } else {
            setInstructionData([
                ...instructionData, {
                    id, subTitle, title, content: instruction
                }
            ])
        }
        setTitle("");
        setInstruction("");
        setSubTitle("");
    }
    return (
        <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={true}>
            <DialogTitle sx={{ textAlign: "center" }}>{"Add Instructions for the test"}</DialogTitle>

            <DialogContent sx={{ padding: "20px 30px" }}>
                <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                    <TextField
                        label="Add Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e: any) => { setTitle(e.target.value) }}
                    />
                    <Button onClick={handleAdd} color="success" variant='contained'>Add</Button>
                </Stack>

                <TextField
                    label="Add Sub title Title"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={subTitle}
                    onChange={(e: any) => { setSubTitle(e.target.value) }}
                />


                <TextField
                    label="Add Content"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                    multiline
                    rows={4}
                    value={instruction}
                    onChange={(e: any) => { setInstruction(e.target.value) }}
                />
                <Box sx={{mt: 4}}>
                    {
                        instructionData.length > 0 &&
                        <ReadLessonSection columnCount={1} instructionData={instructionData}/>
                    }
                </Box>
            </DialogContent>

            <DialogActions sx={{ display: "flex", justifyContent: "center", gap: "20px", padding: "10px 10px 20px 10px" }}>
                <Button onClick={handleClose} color="error" variant='outlined'>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReadLessonModal;