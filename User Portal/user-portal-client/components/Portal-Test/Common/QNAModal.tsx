import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { AddQuestionPropType } from '@/constants/CustomTypes';
import { GenerateCustTextArea, GenerateCustTextField } from '@/components/Common/form/CustTextFieldNErrorMsg';


const QNAModal = ({ open, formik, handleClose }: AddQuestionPropType) => {
    return (
        <>
            {
                formik.values && formik.values.questionType &&
                <Dialog open={open} onClose={handleClose} sx={{ padding: "20px 30px" }} maxWidth="md" fullWidth={false}>
                    <DialogTitle sx={{ textAlign: "center" }}>{"New Q&A question"}</DialogTitle>

                    <DialogContent sx={{ padding: "20px 30px", width: "600px" }}>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <GenerateCustTextArea
                                formik={formik}
                                name='title'
                                label='Add Title/Question'
                                rows={2}
                            />
                            <GenerateCustTextField
                                formik={formik}
                                name='marks'
                                label='Marks'
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="error">Close</Button>
                        <Button onClick={formik.handleSubmit} color="success" variant='outlined'>Add</Button>
                    </DialogActions>
                </Dialog>
            }
        </>
    )
}

export default QNAModal