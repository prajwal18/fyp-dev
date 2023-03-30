import React, { useEffect, useState } from 'react';
import {
  Paper, TableContainer,
  Table, TablePagination,
  Divider
} from '@mui/material';
import TableHeadSection from '../Common/table/TableHeadSection';
import TableBodySection from '../Common/table/TableBodySection';
import { AssignmentType, TableActionTypes, UserTypes } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllAssignments, selectPagination, selectSearchParams, selectSearchTerm, updateAllAssignemnts, updatePagination } from '@/redux/assignment/assignment.slice';
import { handleChangePage, handleChangeRowsPerPage } from '../Common/table/PaginationFunctions';
import { selectUser } from '@/redux/general/general.slice';
import { useRouter } from 'next/router';
import { fetchAllSpecificAssignmentsAC, fetchPaginationDataAC } from '@/redux/assignment/actions';
import { fetchUserAC } from '@/redux/general/actions';


const AssignmentTableHeadData = (assignmentType: string) => {
  let list = [];
  if ([AssignmentType.SUBMITTED.toString(), AssignmentType.GRADED.toString()].includes(assignmentType)) {
    list = [
      { name: 'Title' }, { name: 'Course' }, { name: 'Type' }, { name: 'Due Date' }, { name: "Submitted By" }, { name: 'Full Marks' }, { name: 'Marks Obtained' }, { name: 'Actions' }
    ];
  } else {
    list = [
      { name: 'Title' }, { name: 'Course' }, { name: 'Type' }, { name: 'Due Date' }, { name: 'Full Marks' }, { name: 'Actions' }
    ];
  }
  return list;
}

const AssignmentTableKeyValues = (assignmentType: string) => {
  let list = [];
  if ([AssignmentType.SUBMITTED.toString(), AssignmentType.GRADED.toString()].includes(assignmentType)) {
    list = ['title', 'course', 'type', 'dueDate', 'submittedBy', 'fullMarks', 'marksObtained'];
  } else {
    list = ['title', 'course', 'type', 'dueDate', 'fullMarks',];
  }
  return list;
}

const AssignmentTableActionData = (assignmentType: string, push: any, role: string, handleOpen: (value: any) => void, handleEdit: (value:any) => void) => {
  let list = [];
  if ([AssignmentType.SUBMITTED.toString(), AssignmentType.GRADED.toString()].includes(assignmentType) || role === UserTypes.STUDENT) {
    list = [
      {
        name: TableActionTypes.MESSAGE,
        callback: (data: any) => { push(data.routeLink); }
      }
    ]
  }
  else {
    list = [
      {
        name: TableActionTypes.SHOW,
        callback: handleOpen
      },
      {
        name: TableActionTypes.EDIT,
        callback: handleEdit
      }
    ]
  }
  return list;
}

const AssignmenTableContainer = ({ handleOpen, handleEdit }: { handleOpen: (value: any) => void, handleEdit: (value: any) => void }) => {
  const [allAssignmentsFormatted, setAllAssignmentsFormatted] = useState([]);
  const user = useSelector(selectUser);
  const allAssignments = useSelector(selectAllAssignments);
  const pagination = useSelector(selectPagination);
  const searchTerm = useSelector(selectSearchTerm);
  const searchParams = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const { push, asPath } = useRouter();

  useEffect(() => {
    console.log("In Table: ", searchParams);
    if (searchParams?.courses !== '' && searchParams?.assignmentType !== '') {
      dispatch(fetchPaginationDataAC());
    }
  }, [searchTerm, searchParams, dispatch]);

  useEffect(() => {
    if (searchParams?.courses !== '' && searchParams?.assignmentType !== '') {
      setAllAssignmentsFormatted([]);
      dispatch(fetchAllSpecificAssignmentsAC());
    }
  }, [searchTerm, searchParams, pagination, dispatch]);

  useEffect(() => {
    if (allAssignments && allAssignments.length && searchParams.assignmentType) {
      let tempAssignments = [];
      if (searchParams.assignmentType === AssignmentType.GRADED) {
        tempAssignments = allAssignments.map((assignment: any) => {
          return {
            _id: assignment._id,
            title: assignment?.assignmentId?.title,
            course: assignment?.assignmentId?.courseId?.name,
            type: AssignmentType.GRADED,
            dueDate: assignment?.assignmentId?.dueDate.split('T')[0],
            fullMarks: assignment?.assignmentId?.fullMark,
            marksObtained: assignment.marksObtained,
            submittedBy: assignment?.submittedBy?.name,
            routeLink: `/${user.role}/GradedAssignment?id=${assignment._id}`
          }
        })
      }

      else if (searchParams.assignmentType === AssignmentType.SUBMITTED) {
        tempAssignments = allAssignments.map((assignment: any) => {
          return {
            _id: assignment._id,
            title: assignment?.assignmentId?.title,
            course: assignment?.assignmentId?.courseId?.name,
            type: AssignmentType.SUBMITTED,
            dueDate: assignment?.assignmentId?.dueDate?.split('T')?.[0],
            fullMarks: assignment?.assignmentId?.fullMark,
            marksObtained: assignment.marksObtained,
            submittedBy: assignment?.submittedBy?.name,
            routeLink: user.role === 'Teacher' ? `/Teacher/GradeAssignment?id=${assignment._id}` : `/Student/SubmitAssignment?id=${assignment?.assignmentId?._id}`
          }
        })
      }

      else if (searchParams.assignmentType === AssignmentType.ASSIGNMENT) {
        tempAssignments = allAssignments.map((assignment: any) => {
          return {
            _id: assignment._id,
            title: assignment.title,
            course: assignment.courseId.name,
            type: AssignmentType.ASSIGNMENT,
            dueDate: assignment.dueDate.split('T')[0],
            fullMarks: assignment.fullMark,
            routeLink: user.role === 'Teacher' ? `` : `/Student/SubmitAssignment?id=${assignment._id}`
          }
        })
      }

      setAllAssignmentsFormatted(tempAssignments);
    }
  }, [allAssignments, searchParams, user]);

  useEffect(() => {
    dispatch(fetchUserAC());
    dispatch(updateAllAssignemnts([]));
  }, [dispatch, asPath])

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHeadSection HeadData={AssignmentTableHeadData(searchParams.assignmentType)} />
            <TableBodySection
              skip={pagination.skip || 0}
              includeSN={false}
              dataList={allAssignmentsFormatted}
              keyValues={AssignmentTableKeyValues(searchParams.assignmentType)}
              actionData={AssignmentTableActionData(searchParams.assignmentType, push, user.role, handleOpen, handleEdit)}
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