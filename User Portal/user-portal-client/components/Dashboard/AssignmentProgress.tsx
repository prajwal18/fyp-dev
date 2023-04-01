import {
  Typography,
  Grid, Stack
} from "@mui/material";
//Mui Icons
import { useDispatch, useSelector } from "react-redux";
import { selectCourses, selectUser } from "@/redux/general/general.slice";
import { UserTypes } from "@/constants/Constants";
import { useEffect, useMemo } from "react";
import { fetchUserAC } from "@/redux/general/actions";
import { SelectCourse } from "./ProgressCommon";
import { ChooseOptions, Container, GraphInfoSec, LineChart, SelectStudent } from "./ProgressCommon";
import { selectAssignmentData, selectAssignmentProgress, selectStudents, updateAssignmentProgress } from "@/redux/stat/stat.slice";
import { fetchAssignmentProgressDataAC, fetchStudentsAC } from "@/redux/stat/actions";
import { joinDDListValues } from "@/utils/filterFunctions";
//Mui Icons

const AssignmentProgress = () => {
  const user = useSelector(selectUser);
  const students = useSelector(selectStudents);
  const courses = useSelector(selectCourses);
  const assignmentProgress = useSelector(selectAssignmentProgress); // Contains filter parameters of the test results
  const assignmentData = useSelector(selectAssignmentData);
  const studentName = useMemo(() => {
    if (assignmentProgress?.students) {
      const studentsSelected = assignmentProgress.students.split(',');
      if (studentsSelected.length > 1) {
        return 'All'
      } else {
        const name = students?.find((student: any) => student.value === studentsSelected[0]);
        return name?.name || '';
      }
    } else {
      return '';
    }
  }, [assignmentProgress, students]);

  const dispatch = useDispatch();

  const handleCourseChange = (e: any) => {
    dispatch(updateAssignmentProgress({ ...assignmentProgress, courses: e.target.value }));
  }
  const handleStudentChange = (e: any) => {
    dispatch(updateAssignmentProgress({ ...assignmentProgress, students: e.target.value }));
  }
  const handleUpdateAssignmentLimit = (num: number) => {
    dispatch(updateAssignmentProgress({ ...assignmentProgress, take: num }));
  }


  // Side Effects
  useEffect(() => {
    if (assignmentProgress?.students !== '' && assignmentProgress?.courses !== '') {
      dispatch(fetchAssignmentProgressDataAC());
    }
  }, [assignmentProgress, dispatch]);
  useEffect(() => {
    if (courses?.length && user?.role) {
      if (user.role === UserTypes.STUDENT) {

        dispatch(updateAssignmentProgress({ students: user._id, courses: joinDDListValues(courses), take: 10 }));
      } else {
        dispatch(updateAssignmentProgress({ students: joinDDListValues(students), courses: joinDDListValues(courses), take: 10 }));
      }
    }
  }, [students, courses, user, dispatch]);
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchStudentsAC());
    }
  }, [user, dispatch])
  useEffect(() => {
    dispatch(fetchUserAC());
  }, [dispatch]);
  // Side Effects


  return (
    <Container>
      <Typography variant="h5" component="p">Assignment Progress</Typography>
      <Stack direction='row' spacing={2} justifyContent='flex-end'>
        <SelectCourse
          id='select-course-for-assignment'
          label='Select Course'
          value={assignmentProgress.courses}
          handleChange={handleCourseChange}
        />
        {
          user?.role === UserTypes.TEACHER &&
          <SelectStudent
            id='select-student-for-assignment'
            label='Select Student'
            value={assignmentProgress.students}
            handleChange={handleStudentChange}
          />
        }
      </Stack>
      <ChooseOptions
        handleChange={handleUpdateAssignmentLimit}
        take={assignmentProgress.take} // Determines the number of assignment data to take from the api
      />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <LineChart
            type="Assignment"
            data={assignmentData}
          />
        </Grid>

        <Grid item xs={5}>
          <GraphInfoSec
            title={"Assignment"}
            studentName={studentName}
            data={assignmentData}
          />
        </Grid>
      </Grid>

    </Container>
  );
}

export default AssignmentProgress;