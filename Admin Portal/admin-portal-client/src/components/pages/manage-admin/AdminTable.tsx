import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Paper, TableContainer, Table, TablePagination, Divider } from '@mui/material';
// MUI Icon
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; // Profile
import PersonIcon from '@mui/icons-material/Person'; // Name
import EmailIcon from '@mui/icons-material/Email'; // Email 
import PhoneIcon from '@mui/icons-material/Phone'; // Contact
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

// Redux Operations
import { selectPaginationData, selectAllAdmins } from '../../../redux/admins/admins.slice'; // Importing selector functions from admin.slice
import { fetchAllAdminsAC, fetchPaginationDataAC } from '../../../redux/admins/actions'; // Importing action creators
import { setPaginationDataAC } from '../../../redux/admins/actions';
// Redux Operations

// Filler image
import MyImg from '../../../constants/FillerImg';
// Filler image

const AdminHeadData: Array<TableHeadPropsType> = [
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
        name: "Actions",
        icon: <HandymanIcon />
    }
];


const AdminTable = ({ admins, pagination, handleShow, handleEdit }: { admins: Array<any>, pagination: PaginationStateType, handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
    // Dispatch function redux
    const dispatch = useDispatch();
    // Dispatch function redux
    const handleDelete = (data: any) => {
        toast.error("Sorry, still working on delete.", { autoClose: 1500 });
    }

    // Provide a filler image for admins without profile picture
    const solveMissingProfile = (data: any) => {
        if (data.profile) {
            return { ...data, profile: <MyImg src={data.profile} /> };
        } else {
            return { ...data, profile: <MyImg src={'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg'} /> }
        }
    }
    // Provide a filler image for admins without profile picture
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table>
                    <TableHeadSection HeadData={AdminHeadData} />
                    <TableBodySection
                        dataList={admins && admins.map(solveMissingProfile)}
                        keyValues={['profile', 'name', 'email', 'contact']}
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
    )
}

const AdminTableContainer = ({ handleShow, handleEdit }: { handleShow: (data: any) => void, handleEdit: (data: any) => void }) => {
    const dispatch = useDispatch();
    // Retriving the states from redux
    const admins = useSelector(selectAllAdmins);
    const pagination = useSelector(selectPaginationData);
    // Retriving the states from redux
    useEffect(() => {
        dispatch(fetchPaginationDataAC());
    }, []);
    useEffect(() => {
        dispatch(fetchAllAdminsAC());
        console.log(pagination);
    }, [pagination]);

    return (
        <AdminTable
            admins={admins}
            pagination={pagination}
            handleEdit={handleEdit}
            handleShow={handleShow}
        />
    );
}

export default AdminTableContainer;