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
    fetchSelectedTeacherAC, setPaginationDataAC,
    fetchCourseTeacherPaginationAC, fetchCourseTeacherAC,
    setCourseTeacherSearchTermAC
} from '../../../../redux/teachers/actions';
import { selectSearchTerm, selectSelectedTeacher, resetState, selectAllTeachers, selectPaginationData } from '../../../../redux/teachers/teachers.slice';
// Redux operations

// Modals
import StudentTeacherVM from '../../../common/modal/ViewStudentTeacherModal';

import { TableHeadPropsType } from "../../../../constants/CustomTypes";
import { UserTypes } from "../../../../constants/Constants";
import TableHeadSection from "../../../common/table/TableHeadSection";
import MyImg from "../../../../constants/FillerImg";
import { baseURL } from "../../../../utils/endpoints";
import { selectSelectedCourse, selectSelectionPurpose } from "../../../../redux/courses/courses.slice";
import TeacherStudentBody from "./TeacherStudentBody";




// Provide a filler image for teacher's without profile picture
const solveMissingProfile = (data: any) => {
    if (data.profilePicture) {
        return { ...data, profile: <MyImg src={`${baseURL}${data.profilePicture}`} /> };
    } else {
        return { ...data, profile: <MyImg /> }
    }
}
// Provide a filler image for teacher's without profile picture


// Teacher Table for Faculty Section
const TeacherHeadData: Array<TableHeadPropsType> = [
    { name: "Profile" }, { name: "Name" }, { name: "Actions" },
];
const TeacherTable = () => {
    // Retriving the states from redux
    const teachers = useSelector(selectAllTeachers);
    const pagination = useSelector(selectPaginationData);
    const searchTerm = useSelector(selectSearchTerm);
    const teacher = useSelector(selectSelectedTeacher);
    const course = useSelector(selectSelectedCourse);
    const selectionPurpose = useSelector(selectSelectionPurpose);
    // Retriving the states from redux

    // State to view teacher data
    const [openView, setOpenView] = useState(false);
    // State to view teacher data

    const dispatch = useDispatch();

    const handleSearchTermChange = (event: any) => {
        dispatch(setCourseTeacherSearchTermAC(event.target.value))
    }

    const handleShow = (data: any) => {
        dispatch(fetchSelectedTeacherAC(data._id));
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
        dispatch(fetchCourseTeacherPaginationAC());
    }, [course]);
    useEffect(() => {
        dispatch(fetchCourseTeacherAC());
    }, [pagination]);

    useEffect(() => {
        dispatch(fetchCourseTeacherPaginationAC());
    }, [course, selectionPurpose]);
    // Reset on each visit



    return (
        <>
            <Box>
                <Stack direction='row' spacing={2} sx={{ alignItems: "flex-end", p: 1 }}>
                    <Typography my={1} sx={{ fontWeight: "700" }}>Teachers: </Typography>
                    <TextField
                        label="Search Teacher"
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                    />
                </Stack>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table>
                            <TableHeadSection HeadData={TeacherHeadData} />
                            <TeacherStudentBody
                                dataList={teachers && teachers.map(solveMissingProfile)}
                                handleShow={handleShow} role={UserTypes.TEACHER}
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
                teacher && <StudentTeacherVM data={teacher} open={openView} handleClose={handleCloseView} />
            }
        </>
    )
}

export default TeacherTable;