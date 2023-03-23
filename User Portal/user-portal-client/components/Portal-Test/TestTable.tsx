import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { TestHeadData, AssignmentBodyData } from '@/constants/TempDataDeleteLater';
import { selectPagination, selectSearchParams, selectSearchTerm, updatePagination } from '@/redux/test/test.slice';
import { handleChangePage, handleChangeRowsPerPage } from '../Common/table/PaginationFunctions';

const TestTableContainer = () => {
  const pagination = useSelector(selectPagination);
  const searchTerm = useSelector(selectSearchTerm);
  const searchParam = useSelector(selectSearchParams);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(searchParam.courses === '' || searchParam.testType === '')) {
      //dispatch(fetch pagination data);
    }
  }, [searchTerm, searchParam, dispatch]);

  useEffect(() => {
    if (!(searchParam.courses === '' || searchParam.testType === '')) {
      //dispatch( fetch all the test );
    }
  }, [searchTerm, searchParam, pagination, dispatch]);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHeadSection HeadData={TestHeadData} />
          <TableBodySection
            skip={0}
            includeSN={false}
            dataList={AssignmentBodyData}
            keyValues={['name', 'course', 'status', 'due_date', 'total', 'obtained']}
            actionData={[
              {
                name: TableActionTypes.SHOW,
                callback: (data) => { console.log('People Show Callback: ', data) }
              },
              {
                name: TableActionTypes.MESSAGE,
                callback: (data) => { console.log('People Message Callback: ', data) }
              }
            ]}
          />
        </Table>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.take}
          page={pagination.skip / pagination.take}
          onPageChange={handleChangePage(pagination, updatePagination, dispatch)}
          onRowsPerPageChange={handleChangeRowsPerPage(pagination, updatePagination, dispatch)}
        />
      </TableContainer>
    </Paper>
  )
}

export default TestTableContainer