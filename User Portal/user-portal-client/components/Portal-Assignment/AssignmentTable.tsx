import React, { useState } from 'react';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { AssignmentHeadData, AssignmentBodyData } from '@/constants/TempDataDeleteLater';


const AssignmenTableContainer = () => {
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
          {/* <TablePagination/> */}
        </TableContainer>
      </Paper>
    </>
  )
}

export default AssignmenTableContainer;