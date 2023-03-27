import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { TableActionTypes, TestType } from '@/constants/Constants';
import { selectAllTests, selectPagination, selectSearchParams, selectSearchTerm, updateAllTests, updatePagination } from '@/redux/test/test.slice';
import { handleChangePage, handleChangeRowsPerPage } from '../Common/table/PaginationFunctions';
import { fetchAllSpecificTestsAC, fetchPaginationDataAC } from '@/redux/test/actions';
import { fetchUserAC } from '@/redux/general/actions';
import { selectUser } from '@/redux/general/general.slice';
import { useRouter } from 'next/router';

const TestTableHeadData = (testType: string) => {
  let list = [];
  if ([TestType.SUBMITTED.toString(), TestType.GRADED.toString()].includes(testType)) {
    list = [
      { name: 'Title' }, { name: 'Course' }, { name: 'Type' }, { name: 'Due Date' },  { name: "Submitted By" },{ name: 'Full Marks' }, { name: 'Marks Obtained' }, { name: 'Actions' }
    ];
  } else {
    list = [
      { name: 'Title' }, { name: 'Course' }, { name: 'Type' }, { name: 'Due Date' }, { name: 'Full Marks' }, { name: 'Marks Obtained' }, { name: 'Actions' }
    ];
  }
  return list;
}

const TestTableKeyValues = (testType: string) => {
  let list = [];
  if ([TestType.SUBMITTED.toString(), TestType.GRADED.toString()].includes(testType)) {
    list = ['title', 'course', 'type', 'dueDate', 'submittedBy', 'fullMarks', 'marksObtained'];
  } else {
    list = ['title', 'course', 'type', 'dueDate', 'fullMarks', 'marksObtained'];
  }
  return list;
}

const TestTableContainer = () => {
  const [allTestsFormaeted, setAllTestsFormatted] = useState([]);
  const user = useSelector(selectUser);
  const allTests = useSelector(selectAllTests);
  const pagination = useSelector(selectPagination);
  const searchTerm = useSelector(selectSearchTerm);
  const searchParams = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const { push, asPath } = useRouter();

  useEffect(() => {
    if (searchParams?.courses !== '' && searchParams?.testType !== '') {
      dispatch(fetchPaginationDataAC());
    }
  }, [searchTerm, searchParams, dispatch]);

  useEffect(() => {
    if (searchParams?.courses !== '' && searchParams?.testType !== '') {
      setAllTestsFormatted([]);
      dispatch(fetchAllSpecificTestsAC());
    }
  }, [searchTerm, searchParams, pagination, dispatch]);


  useEffect(() => {
    if (allTests && allTests.length && searchParams.testType) {
      let tempTests = [];
      if (searchParams.testType === TestType.GRADED) {
        tempTests = allTests.map((test: any) => {
          return {
            _id: test._id,
            title: test?.testPaperId?.title,
            course: test?.testPaperId?.courseId?.name,
            type: TestType.GRADED,
            dueDate: test?.testPaperId?.dueDate.split('T')[0],
            fullMarks: test?.testPaperId?.fullMark,
            marksObtained: test.marksObtained,
            submittedBy: test?.submittedBy?.name,
            routeLink: `/${user.role}/GradedTest?id=${test._id}`
          }
        })
      }

      else if (searchParams.testType === TestType.SUBMITTED) {
        tempTests = allTests.map((test: any) => {
          return {
            _id: test._id,
            title: test?.testPaperId?.title,
            course: test?.testPaperId?.courseId?.name,
            type: TestType.SUBMITTED,
            dueDate: test?.testPaperId?.dueDate?.split('T')?.[0],
            fullMarks: test?.testPaperId?.fullMark,
            marksObtained: test.marksObtained,
            submittedBy: test?.submittedBy?.name,
            routeLink: user.role === 'Teacher' ? `/Teacher/GradeTest?id=${test._id}` : `/Student/TakeTest?id=${test?.testPaperId?._id}`
          }
        })
      }

      else if (searchParams.testType === TestType.TEST_PAPER) {
        tempTests = allTests.map((test: any) => {
          return {
            _id: test._id,
            title: test.title,
            course: test.courseId.name,
            type: TestType.TEST_PAPER,
            dueDate: test.dueDate.split('T')[0],
            fullMarks: test.fullMark,
            marksObtained: 0,
            routeLink: user.role === 'Teacher' ? `/Teacher/CreateTest?id=${test._id}` : `/Student/TakeTest?id=${test._id}`
          }
        })
      }

      setAllTestsFormatted(tempTests);
    }
  }, [allTests, searchParams, user]);

  useEffect(() => {
    dispatch(fetchUserAC());
    dispatch(updateAllTests([]));
  }, [dispatch, asPath]);


  useEffect(() => {
    console.log("Hello Over here:", allTestsFormaeted);
  }, [allTestsFormaeted])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHeadSection HeadData={TestTableHeadData(searchParams.testType)} />
          <TableBodySection
            skip={pagination.skip || 0}
            includeSN={false}
            dataList={allTestsFormaeted}
            keyValues={TestTableKeyValues(searchParams.testType)}
            actionData={[
              {
                name: TableActionTypes.MESSAGE,
                callback: (data) => { push(data.routeLink); }
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
  )
}

export default TestTableContainer