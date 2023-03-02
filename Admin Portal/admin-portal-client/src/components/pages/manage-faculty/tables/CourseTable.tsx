import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
    TableBody, TableRow, TableCell,
    Stack, Typography, Box,
    Paper, TableContainer, Table,
    Divider, TextField, TablePagination
} from "@mui/material";
import { toast } from "react-toastify";
import styled from 'styled-components';
// MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
// MUI Icons

// Formik data
import { AddCourseIV, CourseSchema } from "../../manage-course/form-validation/FormValidation";
// Formik data

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../../common/table/PaginationFunctions";
//Pagination Functions

// Redux Operations
import {
    selectSearchTerm, selectSelectedCourse,
    resetState, selectAllCourses, selectPaginationData
} from "../../../../redux/courses/courses.slice";
import {
    fetchSelectedCourseAC, fetchPaginationDataAC,
    updateCourseAC, fetchFacultyCoursePaginationAC,
    fetchFacultyCoursesAC, setFacultyCourseSearchTermAC, setPaginationDataAC
} from "../../../../redux/courses/actions";
import { fetchDDFacultiesAC } from "../../../../redux/faculties/actions";
// Redux Operations

import { TableHeadPropsType } from "../../../../constants/CustomTypes";
import TableHeadSection from "../../../common/table/TableHeadSection";
import AddEditCourse from "../../manage-course/AddEditModal";
import CourseViewModal from "../../manage-course/CourseViewModal";
import { selectSelectedFaculty, updateSelectedFaculty } from "../../../../redux/faculties/faculties.slice";




// Course Table for Faculty Section
const CourseHeadData: Array<TableHeadPropsType> = [
    { name: "S.N" }, { name: "Course" }, { name: "Users" }, { name: "Actions" },
];
const CourseTable = () => {
    // Retriving the states from redux
    const courses = useSelector(selectAllCourses);
    const pagination = useSelector(selectPaginationData);
    const selectedFaculty = useSelector(selectSelectedFaculty);
    const searchTerm = useSelector(selectSearchTerm);
    const course = useSelector(selectSelectedCourse);
    // Retriving the states from redux

    const [open, setOpen] = useState(false);
    // State to view course data
    const [openView, setOpenView] = useState(false);
    // State to view course data

    // To manage Editing
    const [editId, setEditId] = useState<null | string>(null);
    const [isEditing, setIsEditing] = useState(false);
    // To manage Editing

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setFacultyCourseSearchTermAC(event.target.value))
    }
    const handleShow = (data: any) => {
        dispatch(fetchSelectedCourseAC(data._id));
        setOpenView(true);
    };
    const handleEdit = (data: any) => {
        setEditId(data._id);
        setIsEditing(true);
        Object.keys(AddCourseIV).map((key: any) => {
            formik.setFieldValue(key, data[key]);
        });
        setOpen(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        formik.resetForm();
        setOpen(false);
    }
    const handleCloseView = () => {
        setOpenView(false);
    }

    const formik = useFormik({
        initialValues: AddCourseIV,
        validationSchema: CourseSchema,
        enableReinitialize: true,
        onSubmit: (values: any) => {
            try {
                if (isEditing) {
                    editId && dispatch(updateCourseAC(editId, values));
                    dispatch(fetchFacultyCoursePaginationAC());
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                handleClose();
            }
        }
    });
    // Fetching data for drop down and reset on each visit
    useEffect(() => {
        dispatch(resetState());
        dispatch(fetchFacultyCoursePaginationAC());
        dispatch(fetchDDFacultiesAC());
    }, []);
    useEffect(() => {
        dispatch(fetchFacultyCoursePaginationAC());
    }, [selectedFaculty]);
    useEffect(() => {
        dispatch(fetchFacultyCoursesAC());
    }, [selectedFaculty, pagination]);
    // Fetching data for drop down and reset on each visit



    return (
        <>
            <Box>
                <Stack direction='row' spacing={2} sx={{ alignItems: "flex-end", p: 1 }}>
                    <Typography my={1} sx={{ fontWeight: "700" }}>Courses: </Typography>
                    <TextField
                        label="Search Course"
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </Stack>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table>
                            <TableHeadSection HeadData={CourseHeadData} />
                            <TableBodySection
                                dataList={courses}
                                handleShow={handleShow}
                                handleEdit={handleEdit}
                            />
                        </Table>
                    </TableContainer>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pagination.total}
                        rowsPerPage={pagination.take}
                        page={pagination.skip / pagination.take}
                        onPageChange={handleChangePage(pagination, setPaginationDataAC, dispatch)}
                        onRowsPerPageChange={handleChangeRowsPerPage(pagination, setPaginationDataAC, dispatch)}
                    />
                </Paper>
            </Box>
            <AddEditCourse
                open={open}
                handleClose={handleClose}
                formik={formik}
                isEditing={isEditing}
            />
            {
                course && <CourseViewModal data={course} open={openView} handleClose={handleCloseView} />
            }
        </>
    )
}











// Styled component
const IconContainer = styled(Stack)`
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
    &:active {
        background: rgba(0,0,0,0.3);
    }
`;
// Styled component

const TableBodySection = ({ skip, dataList, handleShow, handleEdit }: any) => {
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            {((skip && skip) || 0) + indexOuter + 1}
                        </TableCell>

                        <TableCell>
                            {row.name}
                        </TableCell>

                        <TableCell>
                            <Stack spacing={1}>
                                <Typography>Teachers: 12</Typography>
                                <Typography>Students: 230</Typography>
                            </Stack>
                        </TableCell>

                        <TableCell>
                            <Stack direction="row" gap={1}>
                                <IconContainer
                                    onClick={() => handleShow(row)}
                                    title={`View ${row.name}`}
                                >
                                    <VisibilityIcon color="primary" />
                                </IconContainer>
                                <IconContainer sx={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(row)}
                                    title={`Edit ${row.name}`}
                                >
                                    <EditIcon color="secondary" />
                                </IconContainer>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody >
    )
}

export default CourseTable;