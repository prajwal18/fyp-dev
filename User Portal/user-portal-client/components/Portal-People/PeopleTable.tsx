import React from 'react';
import {
    Paper, TableContainer,
    Table, TablePagination,
    Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes } from '@/constants/Constants';
import { PeopleHeadData, PeopleBodyData } from '@/constants/TempDataDeleteLater';

const PeopleTableContainer = () => {
    /*
        
    */
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table>
                    <TableHeadSection HeadData={PeopleHeadData} />
                    <TableBodySection
                        skip={0}
                        includeSN={true}
                        dataList={PeopleBodyData}
                        keyValues={['profile', 'role', 'name', 'email']}
                        actionData={[
                            {
                                name: TableActionTypes.SHOW,
                                callback: (data) => {console.log('People Show Callback: ', data)}
                            },
                            {
                                name: TableActionTypes.MESSAGE,
                                callback: (data) => {console.log('People Message Callback: ', data)}
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

export default PeopleTableContainer;