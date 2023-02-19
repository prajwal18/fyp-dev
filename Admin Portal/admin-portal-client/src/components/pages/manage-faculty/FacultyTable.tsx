import { useState, useEffect } from 'react';
import { Paper, TableContainer, Table, Grid, Box, TablePagination, Typography, Divider } from '@mui/material';
// MUI Icon
import ApartmentIcon from '@mui/icons-material/Apartment'; // Faculty Name
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'; //Total Courses
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

import { faculties, courses } from '../tempDataDelLater';

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


const FacultyTable = () => {
    const [fPagination, setFPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: faculties.length
    });
    const [facultyData, setFacultyData] = useState(faculties);

    useEffect(() => {
        setFacultyData(faculties.slice(fPagination.skip, fPagination.skip + fPagination.take));
    }, [fPagination]);
    return (
        <Box>
            <Typography my={1} sx={{ fontWeight: "700" }}>Faculty Table</Typography>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={FacultyHeadData} />
                        <TableBodySection
                            dataList={facultyData}
                            keyValues={['name', 'courses']}
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
                    count={fPagination.total}
                    rowsPerPage={fPagination.take}
                    page={fPagination.skip / fPagination.take}
                    onPageChange={handleChangePage(setFPagination)}
                    onRowsPerPageChange={handleChangeRowsPerPage(setFPagination)}
                /> */}
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


// Faculty Table Section
const FacultyTableSection = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FacultyTable />
            </Grid>
            <Grid item xs={6}>
                <CourseTable />
            </Grid>
        </Grid>
    )
}

export default FacultyTableSection;