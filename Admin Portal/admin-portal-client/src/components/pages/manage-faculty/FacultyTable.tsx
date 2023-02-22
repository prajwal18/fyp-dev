import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Paper, TableContainer, Table,
    TablePagination, Divider, Box,
    Typography, Grid
} from '@mui/material';
// MUI Icon
import ApartmentIcon from '@mui/icons-material/Apartment'; // Faculty Name
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'; //Total Courses
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
import { selectPaginationData, selectAllFaculties } from '../../../redux/faculties/faculties.slice'; // Importing selector functions from course.slice
import {
    fetchAllFacultiesAC, fetchPaginationDataAC,
    setPaginationDataAC, deleteFacultyAC
} from '../../../redux/faculties/actions'; // Importing action creators
// Redux Operations

import { courses } from '../tempDataDelLater';


const FacultyHeadData: Array<TableHeadPropsType> = [
    {
        name: "S.N"
    },
    {
        name: "Name",
        icon: <ApartmentIcon />
    },
    {
        name: "Courses",
        icon: <FormatListNumberedOutlinedIcon />
    },
    {
        name: "Actions",
        icon: <HandymanIcon />
    }
];


const FacultyTable = ({ data, pagination, handleShow, handleEdit }: TableType) => {
    const faculties = data;
    // Dispatch function redux
    const dispatch = useDispatch();
    // Dispatch function redux
    const handleDelete = (id: string) => {
        //dispatch(deleteStudentAC(id))
        toast.warn('Delete functionality is not available right now.');
    }

    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Faculty Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={FacultyHeadData} />
                        <TableBodySection
                            dataList={faculties}
                            keyValues={['name', 'courses']}
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

// Course Table for Faculty Section
const CourseHeadData: Array<TableHeadPropsType> = [
    { name: "S.N" }, { name: "Course" }, { name: "Students" }, { name: "Teachers" }, { name: "Actions" },
]
const CourseTable = () => {
    const [cPagination, setCPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: courses.length
    });
    const [courseData, setCourseData] = useState(courses);

    useEffect(() => {
        setCourseData(courses.slice(cPagination.skip, cPagination.skip + cPagination.take));
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
                            keyValues={['name', 'students', 'teachers']}
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


// Faculty Table Section
const FacultyTableContainer = ({ handleShow, handleEdit }: { handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
    const dispatch = useDispatch();
    // Retriving the states from redux
    const faculties = useSelector(selectAllFaculties);
    const pagination = useSelector(selectPaginationData);
    // Retriving the states from redux
    useEffect(() => {
        dispatch(fetchPaginationDataAC());
    }, []);
    useEffect(() => {
        dispatch(fetchAllFacultiesAC());
        console.log(pagination);
    }, [pagination]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FacultyTable
                    data={faculties}
                    pagination={pagination}
                    handleEdit={handleEdit}
                    handleShow={handleShow}
                />
            </Grid>
            <Grid item xs={6}>
                <CourseTable />
            </Grid>
        </Grid>
    )
}

export default FacultyTableContainer;