import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Paper, TableContainer, Table,
    TablePagination, Divider, Box,
    Typography, Grid, Stack
} from '@mui/material';
// MUI Icon
import ApartmentIcon from '@mui/icons-material/Apartment'; // Faculty Name
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'; //Total Courses
import HandymanIcon from '@mui/icons-material/Handyman'; // Actions
// MUI Icon
import { TableHeadPropsType, TableType } from '../../../constants/CustomTypes';
import CourseTable from './tables/CourseTable';

// Table Head and Body
import TableHeadSection from '../../common/table/TableHeadSection';
import TableBodySection from './tables/FacultyTableBody';
// Table Head and Body

//Pagination Functions
import { handleChangePage, handleChangeRowsPerPage } from "../../common/table/PaginationFunctions";
//Pagination Functions

// Redux Operations
import { selectPaginationData, selectAllFaculties, updateSelectedFaculty } from '../../../redux/faculties/faculties.slice'; // Importing selector functions from course.slice
import {
    fetchAllFacultiesAC, fetchPaginationDataAC,
    setPaginationDataAC, deleteFacultyAC
} from '../../../redux/faculties/actions'; // Importing action creators
// Redux Operations


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
        dispatch(deleteFacultyAC(id));
    }

    return (
        <Box>
            <Stack direction='row' spacing={2} sx={{ alignItems: "flex-end", p: 2 }}>
                <Typography sx={{ fontWeight: "700" }}>Faculty Table</Typography>
            </Stack>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={FacultyHeadData} />
                        <TableBodySection
                            dataList={faculties}
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

// Faculty Table Section
const FacultyTablesSection = ({ handleShow, handleEdit }: {handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
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
        dispatch(updateSelectedFaculty());
    }, [pagination]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={7}>
                <FacultyTable
                    data={faculties}
                    pagination={pagination}
                    handleEdit={handleEdit}
                    handleShow={handleShow}
                />
            </Grid>
            <Grid item xs={5}>
                <CourseTable />
            </Grid>
        </Grid>
    )
}

export default FacultyTablesSection;