import { useState, useEffect } from 'react';
import { Paper, TableContainer, Table, TablePagination, Divider } from '@mui/material';
// MUI Icon
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // Profile
import PersonIcon from '@mui/icons-material/Person'; // Name
import EmailIcon from '@mui/icons-material/Email'; // Email 
import PhoneIcon from '@mui/icons-material/Phone'; // Contact
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

import { teachers } from '../tempDataDelLater';

const TeacherHeadData: Array<TableHeadPropsType> = [
    {
        name: "S.N"
    },
    {
        name: "Profile",
        icon: <AccountCircleOutlinedIcon />
    },
    {
        name: "Name",
        icon: <PersonIcon />
    },
    {
        name: "Email",
        icon: <EmailIcon />
    },
    {
        name: "Contact",
        icon: <PhoneIcon />
    },
    {
        name: "Total Courses",
        icon: <FormatListNumberedOutlinedIcon />
    },
    {
        name: "Actions",
        icon: <HandymanIcon />
    }
];


const TeacherTable = () => {
    const [tPagination, setTPagination] = useState<PaginationStateType>({
        skip: 0, take: 5, total: teachers.length
    });
    const [teacherData, setTeacherData] = useState(teachers);

    useEffect(() => {
        setTeacherData(teachers.slice(tPagination.skip, tPagination.skip + tPagination.take));
    }, [tPagination]);
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table>
                    <TableHeadSection HeadData={TeacherHeadData}/>
                    <TableBodySection
                            dataList={teacherData}
                            keyValues={['profile', 'name', 'email', 'contact', 'totalCourses']}
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
    )
}

export default TeacherTable;