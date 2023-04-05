import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Stack, Typography, Box,
    Paper, TableContainer, Table,
    Divider, TextField, TablePagination
} from "@mui/material";

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../../common/table/PaginationFunctions";
//Pagination Functions

// Redux operations
import {
    fetchSelectedStudentAC, setPaginationDataAC,
    fetchCourseStudentPaginationAC, fetchCourseStudentAC,
    setCourseStudentSearchTermAC
} from '../../../../redux/students/actions';
import { selectSearchTerm, selectSelectedStudent, resetState, selectAllStudents, selectPaginationData } from '../../../../redux/students/students.slice';
// Redux operations

// Modals
import StudentTeacherVM from '../../../common/modal/ViewStudentTeacherModal';

import { TableHeadPropsType } from "../../../../constants/CustomTypes";
import TableHeadSection from "../../../common/table/TableHeadSection";
import { MyImg } from "../../../../constants/FillerImg";
import { baseURL } from "../../../../utils/endpoints";
import { selectSelectedCourse, selectSelectionPurpose } from "../../../../redux/courses/courses.slice";
import { UserTypes } from "../../../../constants/Constants";
import TeacherStudentBody from "./TeacherStudentBody";
import { setProfileImg } from "../../../common/ProfilePicture";



// Student Table for Faculty Section
const StudentHeadData: Array<TableHeadPropsType> = [
    { name: "Profile" }, { name: "Name" }, { name: "Actions" },
];
const StudentTable = () => {
    // Retriving the states from redux
    const students = useSelector(selectAllStudents);
    const pagination = useSelector(selectPaginationData);
    const searchTerm = useSelector(selectSearchTerm);
    const student = useSelector(selectSelectedStudent);
    const course = useSelector(selectSelectedCourse);
    const selectionPurpose = useSelector(selectSelectionPurpose);
    // Retriving the states from redux

    // State to view student data
    const [openView, setOpenView] = useState(false);
    // State to view student data

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setCourseStudentSearchTermAC(event.target.value))
    };

    const handleShow = (data: any) => {
        dispatch(fetchSelectedStudentAC(data._id));
        setOpenView(true);
    };

    const handleCloseView = () => {
        setOpenView(false);
    };


    // Reset on each visit
    useEffect(() => {
        dispatch(resetState());
    }, []);
    useEffect(() => {
        dispatch(fetchCourseStudentPaginationAC());
    }, [course]);
    useEffect(() => {
        dispatch(fetchCourseStudentAC());
    }, [pagination]);

    useEffect(() => {
        dispatch(fetchCourseStudentPaginationAC());
    }, [course, selectionPurpose]);
    // Reset on each visit



    return (
        <>
            <Box>
                <Stack direction='row' spacing={2} sx={{ alignItems: "flex-end", p: 1 }}>
                    <Typography my={1} sx={{ fontWeight: "700" }}>Students: </Typography>
                    <TextField
                        label="Search Student"
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </Stack>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table>
                            <TableHeadSection HeadData={StudentHeadData} />
                            <TeacherStudentBody
                                dataList={students && students.map(setProfileImg)}
                                handleShow={handleShow} role={UserTypes.STUDENT}
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
            {
                student && <StudentTeacherVM data={student} open={openView} handleClose={handleCloseView} />
            }
        </>
    )
}



export default StudentTable;