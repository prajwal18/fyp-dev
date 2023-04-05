import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Paper, TableContainer, Table,
    TablePagination, Divider, Box,
    Typography, Grid
} from '@mui/material';
// MUI Icon
import GroupsIcon from '@mui/icons-material/Groups'; // Total Teachers
import HandymanIcon from '@mui/icons-material/Handyman'; // Actions
// MUI Icon
import { TableHeadPropsType, TableType } from '../../../constants/CustomTypes';

// Table Head and Body
import TableHeadSection from '../../common/table/TableHeadSection';
import TableBodySection from './tables/CourseTableBody';
// Table Head and Body

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../common/table/PaginationFunctions";
//Pagination Functions

// Redux Operations
import { selectPaginationData, selectAllCourses, updateSelectedCourse } from '../../../redux/courses/courses.slice'; // Importing selector functions from course.slice
import {
    deleteCourseAC,
    fetchAllCoursesAC, fetchPaginationDataAC,
    setPaginationDataAC
} from '../../../redux/courses/actions'; // Importing action creators

import TeacherTable from './tables/TeacherTable';
import StudentTable from './tables/StudentTable';


const CourseHeadData: Array<TableHeadPropsType> = [
    {
        name: "S.N"
    },
    {
        name: "Name"
    },
    {
        name: "Faculty"
    },
    {
        name: "Users",
        icon: <GroupsIcon />
    },
    {
        name: "Actions",
        icon: <HandymanIcon />
    }
];


const CourseTable = ({ data, pagination, handleShow, handleEdit }: TableType) => {
    const courses = data;
    // Dispatch function redux
    const dispatch = useDispatch();
    // Dispatch function redux
    const handleDelete = (id: string) => {
        dispatch(deleteCourseAC(id))
    }
    
    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Course Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={CourseHeadData} />
                        <TableBodySection
                            dataList={courses}
                            handleShow={handleShow}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            skip={pagination.skip}
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
    )
}

// Course Table Section
// Faculty Table Section
const CourseTableContainer = ({ handleShow, handleEdit }: { handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
    const dispatch = useDispatch();
    // Retriving the states from redux
    const courses = useSelector(selectAllCourses);
    const pagination = useSelector(selectPaginationData);
    // Retriving the states from redux
    useEffect(() => {
        dispatch(fetchPaginationDataAC());
    }, []);
    useEffect(() => {
        dispatch(fetchAllCoursesAC());
        dispatch(updateSelectedCourse());
    }, [pagination]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <CourseTable
                    data={courses}
                    pagination={pagination}
                    handleEdit={handleEdit}
                    handleShow={handleShow}
                />
            </Grid>
            <Grid item xs={3.5}>
                <TeacherTable />
            </Grid>
            <Grid item xs={3.5}>
                <StudentTable />
            </Grid>
        </Grid>
    )
}

export default CourseTableContainer;