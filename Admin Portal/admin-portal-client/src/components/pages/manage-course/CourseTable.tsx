import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Paper, TableContainer, Table,
    TablePagination, Divider, Box,
    Typography, Grid
} from '@mui/material';
// MUI Icon
import PersonIcon from '@mui/icons-material/Person'; // Name
import ApartmentIcon from '@mui/icons-material/Apartment'; // Faculty 
import GroupsIcon from '@mui/icons-material/Groups'; // Total Teachers
import HandymanIcon from '@mui/icons-material/Handyman'; // Actions
// MUI Icon
import { TableHeadPropsType, PaginationStateType, TableType } from '../../../constants/CustomTypes';

// Table Head and Body
import TableHeadSection from '../../common/table/TableHeadSection';
import TableBodySection from '../../common/table/TableBodySection';
// Table Head and Body

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../common/table/PaginationFunctions";
//Pagination Functions

// Redux Operations
import { selectPaginationData, selectAllCourses } from '../../../redux/courses/courses.slice'; // Importing selector functions from course.slice
import {
    fetchAllCoursesAC, fetchPaginationDataAC,
    setPaginationDataAC
} from '../../../redux/courses/actions'; // Importing action creators

import { students, teachers } from '../tempDataDelLater';
import MyImg from '../../../constants/FillerImg';
import { baseURL } from '../../../utils/endpoints';


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
        //dispatch(deleteStudentAC(id))
        toast.warn('Delete functionality is not available right now.');
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
                            keyValues={['name', 'faculty', 'users']}
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
                <Divider />
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
                <Divider />
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
        console.log(pagination);
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