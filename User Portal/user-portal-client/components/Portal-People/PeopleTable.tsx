import React, { useEffect, useState } from 'react';
import {
    Paper, TableContainer,
    Table, TablePagination,
    Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { PeopleHeadData, PeopleBodyData } from '@/constants/TempDataDeleteLater';
import { useDispatch, useSelector } from 'react-redux';
import { selectMembers, selectPagination, selectSearchParams, selectSearchTerm, updatePagination, updateSelectedMember } from '@/redux/people/people.slice';
import { handleChangePage, handleChangeRowsPerPage } from '../Common/table/PaginationFunctions';
import { fetchAllMembersAC, fetchPaginationDataAC } from '@/redux/people/actions';
import { ViewProfileModalOnly } from '../ViewEditProfile/ViewProfileModal';
import { updateReceiver } from '@/redux/message/message.slice';
import { useRouter } from 'next/router';
import { selectUser } from '@/redux/general/general.slice';

const PeopleTableContainer = () => {
    const [openView, setOpenView] = useState(false);
    const user = useSelector(selectUser);
    const members = useSelector(selectMembers);
    const pagination = useSelector(selectPagination);
    const searchTerm = useSelector(selectSearchTerm);
    const searchParam = useSelector(selectSearchParams);
    const dispatch = useDispatch();
    const { push } = useRouter();

    useEffect(() => {
        if (searchParam.courses !== '' && searchParam.role !== '') {
            dispatch(fetchPaginationDataAC());
        }
    }, [searchTerm, searchParam, dispatch]);

    useEffect(() => {
        if (searchParam.courses !== '' && searchParam.role !== '') {
            dispatch(fetchAllMembersAC());
        }
    }, [searchTerm, searchParam, pagination, dispatch]);

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHeadSection HeadData={PeopleHeadData} />
                        <TableBodySection
                            skip={pagination.skip}
                            includeSN={true}
                            dataList={members}
                            keyValues={['profile', 'role', 'name', 'email']}
                            actionData={[
                                {
                                    name: TableActionTypes.SHOW,
                                    callback: (data) => {
                                        dispatch(updateSelectedMember(data));
                                        setOpenView(true);
                                    }
                                },
                                {
                                    name: TableActionTypes.MESSAGE,
                                    callback: (data) => { 
                                        dispatch(updateReceiver(data));
                                        push(`/${user.role}/Message`);
                                     }
                                }
                            ]}
                        />
                    </Table>
                    <Divider />
                    <TablePagination
                        rowsPerPageOptions={[1, 5, 10, 25]}
                        component="div"
                        count={pagination.total}
                        rowsPerPage={pagination.take}
                        page={pagination.skip / pagination.take}
                        onPageChange={handleChangePage(pagination, updatePagination, dispatch)}
                        onRowsPerPageChange={handleChangeRowsPerPage(pagination, updatePagination, dispatch)}
                    />
                </TableContainer>
            </Paper>
            <ViewProfileModalOnly open={openView} setOpen={setOpenView} />
        </>
    )
}

export default PeopleTableContainer;