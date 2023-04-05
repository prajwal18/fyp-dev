import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Paper, TableContainer, Table, TablePagination, Divider } from '@mui/material';
// MUI Icon
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // Profile
import PersonIcon from '@mui/icons-material/Person'; // Name
import EmailIcon from '@mui/icons-material/Email'; // Email 
import PhoneIcon from '@mui/icons-material/Phone'; // Contact
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
import { selectPaginationData, selectAllTeachers } from '../../../redux/teachers/teachers.slice'; // Importing selector functions from student.slice
import {
    fetchAllTeachersAC, fetchPaginationDataAC,
    setPaginationDataAC, deleteTeacherAC
} from '../../../redux/teachers/actions'; // Importing action creators
// Redux Operations

import { httpCheckUserDocuments } from '../../../services/student.service';
import ConfirmDeleteModal from '../../common/modal/ConfirmDeleteModal';
import { setProfileImg } from '../../common/ProfilePicture';


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


const TeacherTable = ({ data, pagination, handleShow, handleEdit }: TableType) => {
    const teachers = data;
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [delUserId, setDelUserId] = useState<any>(null);
    // Dispatch function redux
    const dispatch = useDispatch();
    // Dispatch function redux
    const handleDelete = (id: string) => {
        httpCheckUserDocuments(id)
            .then((response: any) => response.data)
            .then((response: any) => {
                if (response.success) {
                    toast.warn(response.message);
                    setConfirmDelete(true);
                    setDelUserId(id);
                } else {
                    dispatch(deleteTeacherAC(id));
                }
            })
            .catch((error: any) => { toast.error(error.message) })
    }

    const handleConfirmDelete = () => {
        if (delUserId) {
            dispatch(deleteTeacherAC(delUserId));
            setConfirmDelete(false);
        }
    }
    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={TeacherHeadData} />
                        <TableBodySection
                            dataList={teachers && teachers.map(setProfileImg)}
                            keyValues={['profile', 'name', 'email', 'contact', 'totalCourses']}
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
            <ConfirmDeleteModal open={confirmDelete} setOpen={setConfirmDelete} handleDelete={handleConfirmDelete} />
        </>
    )
}

const TeacherTableContainer = ({ handleShow, handleEdit }: { handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
    const dispatch = useDispatch();
    // Retriving the states from redux
    const teachers = useSelector(selectAllTeachers);
    const pagination = useSelector(selectPaginationData);
    // Retriving the states from redux
    useEffect(() => {
        dispatch(fetchPaginationDataAC());
    }, []);
    useEffect(() => {
        dispatch(fetchAllTeachersAC());
        console.log(pagination);
    }, [pagination]);

    return (
        <TeacherTable
            data={teachers}
            pagination={pagination}
            handleEdit={handleEdit}
            handleShow={handleShow}
        />
    )
}

export default TeacherTableContainer;