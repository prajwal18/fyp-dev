import React, { useEffect, useState } from 'react';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { AssignmentHeadData, AssignmentBodyData } from '@/constants/TempDataDeleteLater';
import { useDispatch, useSelector } from 'react-redux';
import { selectPagination, selectSearchTerm, updatePagination } from '@/redux/assignment/assignment.slice';
import { selectSearchParams } from '@/redux/people/people.slice';
import { handleChangePage, handleChangeRowsPerPage } from '../Common/table/PaginationFunctions';


const AssignmenTableContainer = () => {
  const pagination = useSelector(selectPagination);
  const searchTerm = useSelector(selectSearchTerm);
  const searchParams = useSelector(selectSearchParams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(searchParams.courses === '' || searchParams.assignmentType === '')) {
      //dispatch(fetch pagination data);
    }
  }, [searchTerm, searchParams, dispatch]);

  useEffect(() => {
    if (!(searchParams.courses === '' || searchParams.assignmentType === '')) {
      //dispatch( fetch all the assigments );
    }
  }, [searchTerm, searchParams, pagination, dispatch]);
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHeadSection HeadData={AssignmentHeadData} />
            <TableBodySection
              skip={0}
              includeSN={false}
              dataList={AssignmentBodyData}
              keyValues={['name', 'course', 'status', 'due_date', 'total', 'obtained']}
              actionData={[
                {
                  name: TableActionTypes.SHOW,
                  callback: (data) => { console.log('Assignment Show Callback: ', data) }
                },
                {
                  name: TableActionTypes.MESSAGE,
                  callback: (data) => { console.log('Submit Assignment Callback: ', data) }
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
    </>
  )
}

export default AssignmenTableContainer;