import React from 'react';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { TestHeadData, AssignmentBodyData } from '@/constants/TempDataDeleteLater';

const TestTableContainer = () => {
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
        {/* <TablePagination/> */}
      </TableContainer>
    </Paper>
  )
}

export default TestTableContainer