import { useState, useEffect } from 'react';
import {
    Paper, TableContainer, Table,
    Typography, Grid, Box,
    TablePagination,
    Divider
} from '@mui/material';
// MUI Icon
import PersonIcon from '@mui/icons-material/Person'; // Name
import ApartmentIcon from '@mui/icons-material/Apartment'; // Faculty 
import GroupsIcon from '@mui/icons-material/Groups'; // Total Teachers
import HandymanIcon from '@mui/icons-material/Handyman'; // Actions
// MUI Icon
import { TableHeadPropsType, PaginationStateType } from '../../../constants/CustomTypes';

// Table Head and Body
import TableHeadSection from '../../common/table/TableHeadSection';
import TableBodySection from '../../common/table/TableBodySection';
// Table Head and Body

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../common/table/PaginationFunctions";
//Pagination Functions

import { courses, students, teachers } from '../tempDataDelLater';
const newCourses = courses.map((data: any) => {
    return {
        ...data,
        users: <>
            <Typography sx={{fontSize:"0.8rem"}}>Students: { data.students}</Typography>
            <Typography sx={{fontSize:"0.8rem"}}>Teachers: { data.teachers}</Typography>
        </>
    }
})


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


const CourseTable = () => {
    const [cPagination, setCPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: newCourses.length
    });
    const [courseData, setCourseData] = useState(newCourses);

    useEffect(() => {
        setCourseData(newCourses.slice(cPagination.skip, cPagination.skip + cPagination.take));
    }, [cPagination]);
    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Course Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={CourseHeadData} />
                        <TableBodySection
                            dataList={courseData}
                            keyValues={['name', 'faculty', 'users']}
                            handleShow={(data: any) => { }}
                            handleEdit={(data: any) => { }}
                            handleDelete={(data: any) => { }}
                        />
                    </Table>
                </TableContainer>
                <Divider/>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={cPagination.total}
                    rowsPerPage={cPagination.take}
                    page={cPagination.skip / cPagination.take}
                    onPageChange={handleChangePage(setCPagination)}
                    onRowsPerPageChange={handleChangeRowsPerPage(setCPagination)}
                /> */}
            </Paper>
        </Box>
    )
}

// Student Table for Course Section
const StudentTeacherHeadData: Array<TableHeadPropsType> = [
    { name: "S.N" }, { name: "Profile" }, { name: "Name" }, { name: "Actions" },
];
const StudentTable = () => {
    const [sPagination, setSPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: students.length
    });
    const [studentData, setStudentData] = useState(students);

    useEffect(() => {
        setStudentData(students.slice(sPagination.skip, sPagination.skip + sPagination.take));
    }, [sPagination]);
    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Student Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={StudentTeacherHeadData} />
                        <TableBodySection
                            dataList={studentData}
                            keyValues={['profile', 'name']}
                            handleShow={(data: any) => { }}
                            handleEdit={(data: any) => { }}
                            handleDelete={(data: any) => { }}
                        />
                    </Table>
                </TableContainer>
                <Divider/>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sPagination.total}
                    rowsPerPage={sPagination.take}
                    page={sPagination.skip / sPagination.take}
                    onPageChange={handleChangePage(setSPagination)}
                    onRowsPerPageChange={handleChangeRowsPerPage(setSPagination)}
                /> */}
            </Paper>
        </Box>
    )
}

// Teacher Table for Course Section
const TeacherTable = () => {
    const [tPagination, setTPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: teachers.length
    });
    const [teacherData, setTeacherData] = useState(teachers);

    useEffect(() => {
        setTeacherData(teachers.slice(tPagination.skip, tPagination.skip + tPagination.take));
    }, [tPagination]);
    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Teacher Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={StudentTeacherHeadData} />
                        <TableBodySection
                            dataList={teacherData}
                            keyValues={['profile', 'name']}
                            handleShow={(data: any) => { }}
                            handleEdit={(data: any) => { }}
                            handleDelete={(data: any) => { }}
                        />
                    </Table>
                </TableContainer>
                <Divider/>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tPagination.total}
                    rowsPerPage={tPagination.take}
                    page={tPagination.skip / tPagination.take}
                    onPageChange={handleChangePage(setTPagination)}
                    onRowsPerPageChange={handleChangeRowsPerPage(setTPagination)}
                /> */}
            </Paper>
        </Box >
    )
}

// Course Table Section
// Faculty Table Section
const CourseTableSection = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <CourseTable />
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

export default CourseTableSection;