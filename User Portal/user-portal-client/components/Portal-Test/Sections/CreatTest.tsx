import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import parse from 'html-react-parser';
import {
    Box, Tabs, Tab,
    Stack, Typography,
    Button
} from '@mui/material';
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
// MUI Icons
import { AddNewQuestion, TestQuestionContainerUpdatable, TestTitleViewEdit } from '../Common/TestCommonComponents';
import QNAModal from '../Common/QNAModal';
import MCQModal from '../Common/MCQModal';
import { BorderedBox } from '@/components/Common/styled/StyledComponents';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedTest } from '@/redux/test/test.slice';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUpdateTest } from '@/service/test.service';
import { fetchSelectedTestPaperAC } from '@/redux/test/actions';
import { TypesOfQuestions } from '@/constants/Constants';
import { IV_MCQ, IV_QNA, MCQ_Schema, QNA_Schema } from './QuestionsFormik';
// Using dynamic import for jodit
const Jodit = dynamic(() => import('@/components/TextEditor/Jodit'), { ssr: false })
// Using dynamic import for jodit



const SNSBtns = ({ page, setPage, formik }: { page: number, setPage: (value: any) => void, formik: any }) => {
    const handleNext = () => {
        setPage(1);
    }
    const handlePrev = () => {
        setPage(0);
    }
    const handleSave = (e: any) => {
        formik.handleSubmit(e);
    }
    const handleSubmit = (e: any) => {
        formik.handleSubmit(e);
    }
    return (
        <Stack spacing={1}>
            <Stack direction='row' spacing={1}>
                <Button color="warning" variant='contained' onClick={handleSave}>Save</Button>
                {
                    page === 0 ?
                        <Button color="primary" variant='outlined' onClick={handleNext}>Next</Button>
                        :
                        <Button color="primary" variant='outlined' onClick={handlePrev}>Back</Button>
                }

            </Stack>
            <Button color="error" variant='contained' onClick={handleSubmit}>Submit</Button>

        </Stack>
    )
}

const TestTabs = ({ value, setValue, formik }: { value: number, setValue: (value: any) => void, formik: any }) => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between'>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Select to navigate between Test Instructions and Test Questions"
            >
                <Tab
                    value={0}
                    label="Test Instructions"
                />
                <Tab value={1} label="Test Questions" />
            </Tabs>
            <SNSBtns page={value} setPage={setValue} formik={formik} />
        </Stack>
    );
}

const TestQuestionSection = ({ formik }: { formik: any }) => {
    const [addNewQuestion, setAddNewQuestion] = useState(true);
    const handleAddNewQuestion = () => { setAddNewQuestion(true) };
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<null | number>(null);

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
        formikQNA.setFieldValue('questionType', TypesOfQuestions.QNA);
    }
    //For Dialogue box to add new question

    // Handle Edit / Remove Question
    const handleEditQuestion = (question: any, index: number) => {
        setIsEditing(true);
        setEditIndex(index);
        if (question.questionType === TypesOfQuestions.QNA) {
            Object.keys(question).map((key: string) => {
                formikQNA.setFieldValue(key, question[key]);
            })
            setToOpen("Q&A");
            setOpen(true);
        } else {
            Object.keys(question).map((key: string) => {
                formikMCQ.setFieldValue(key, question[key]);
            })
            setToOpen("MCQ");
            setOpen(true);
        }
    }
    const handleRemoveQuestion = (index: number) => {
        let tempArr = JSON.parse(JSON.stringify(formik.values.questions))
        tempArr.splice(index, 1);
        formik.setFieldValue('questions', tempArr);
    }
    // Handle Edit / Remove Question

    // Handle Close all
    const handleClose = () => {
        setIsEditing(false);
        setEditIndex(null);
        setOpen(false);
        formikMCQ.resetForm();
        formikQNA.resetForm();
        if (formik.values?.questions && formik.values.questions.length >= 1) {
            setAddNewQuestion(false);
        }
    }
    // Handle Close all

    // Handle MCQ QNA Submit
    const handleSubmitQuestion = (values: any) => {
        try {
            if (isEditing && editIndex !== null) {
                let tempArr = JSON.parse(JSON.stringify(formik.values.questions))
                tempArr[editIndex] = values;
                formik.setFieldValue('questions', tempArr);
            } else {
                formik.setFieldValue('questions', [...(formik.values.questions || []), values]);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            handleClose();
        }
    }
    // Handle MCQ QNA Submit


    // Formik for the two questions add/edit
    const formikMCQ = useFormik({
        initialValues: IV_MCQ,
        validationSchema: MCQ_Schema,
        enableReinitialize: true,
        onSubmit: handleSubmitQuestion
    });
    const formikQNA = useFormik({
        initialValues: IV_QNA,
        validationSchema: QNA_Schema,
        enableReinitialize: true,
        onSubmit: handleSubmitQuestion
    });
    // Formik for the two questions add/edit
    return (
        <Stack spacing={2}>
            <>
                {
                    formik.values.questions.map((question: any, index: number) => (
                        <React.Fragment key={index}>
                            <TestQuestionContainerUpdatable
                                question={question} index={index + 1}
                                handleEdit={() => handleEditQuestion(question, index)}
                                handleRemove={() => handleRemoveQuestion(index)}
                            />
                        </React.Fragment>
                    ))
                }
            </>
            <>
                {
                    addNewQuestion &&
                    <AddNewQuestion
                        testQuestions={formik.values.questions}
                        handleOpenMCQ={handleOpenMCQ}
                        handleOpenQNA={handleOpenQNA}
                    />
                }
            </>
            <Button
                sx={{
                    width: "100%", padding: "10px 20px !important",
                    background: "rgb(0 0 0 / 10%)", color: "rgb(0 0 0)",
                    display: "flex", alignItems: "center", gap: "10px"
                }}
                onClick={handleAddNewQuestion}
            >
                <AddIcon />
                <Typography sx={{ fontSize: "20px" }}>Add another question</Typography>
            </Button>
            <>
                {
                    toOpen === "Q&A" ?
                        <QNAModal open={open} formik={formikQNA} handleClose={handleClose}
                        />
                        :
                        <MCQModal open={open} formik={formikMCQ} handleClose={handleClose}
                        />
                }
            </>
        </Stack>
    );
}

const TestInstructionSection = ({ formik }: { formik: any }) => {
    const handleSetContent = (data: string) => {
        formik.setFieldValue('instructions', data);
    }
    return (
        <Stack direction='row' gap={3}>
            <Box sx={{ width: "50%" }}>
                <Jodit content={formik.values?.instructions || ''} setContent={handleSetContent} />
            </Box>
            <BorderedBox sx={{ width: "50%" }}>
                {
                    parse(formik.values?.instructions || '')
                }
            </BorderedBox>
        </Stack>
    );
}

const RenderTabPanel = ({ page, formik }: { page: number, formik: any }) => {
    if (page === 0) {
        return (<TestInstructionSection formik={formik} />);
    } else if (page === 1) {
        return (<TestQuestionSection formik={formik} />);
    } else {
        return (<></>);
    }
}

const CreateTestContainer = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(0); // To navigate between Test Instructions and Test Questions
    const testData = useSelector(selectSelectedTest);

    const formik = useFormik({
        initialValues: {},
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const response = await apiCallNResp(() => httpUpdateTest(values, testData._id));
                if (response.success) {
                    toast.success(response.message);
                    dispatch(fetchSelectedTestPaperAC({id: response.data._id}))
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    });

    useEffect(() => {
        if (testData?._id) {
            formik.setFieldValue('instructions', testData?.instructions || '');
            formik.setFieldValue('questions', testData?.questions || []);
        }
    }, [testData]);
    return (
        <Stack
            sx={{ padding: "20px 30px", background: "white", minHeight: "95vh" }}
            direction='row'
            alignItems='flex-start'
        >
            <Box sx={{ padding: "20px", width: "100%" }}>
                <TestTitleViewEdit
                    formik={formik}
                    testData={testData}
                />
                <TestTabs value={page} setValue={setPage} formik={formik} />
                <Box sx={{ padding: "30px 20px" }}>
                    <RenderTabPanel page={page} formik={formik} />
                </Box>
            </Box>
        </Stack>

    );
}



export default CreateTestContainer;