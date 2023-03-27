import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button

} from "@mui/material";
import { joinCoursesCS } from '@/utils/filterFunctions';

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchParams, updateSearchParams } from '@/redux/assignment/assignment.slice';
import { selectCourses } from '@/redux/general/general.slice';
import { AssignmentType } from '@/constants/Constants';
// MUI Icon

const AssignmentFilter = ({ showFilter }: { showFilter: any }) => {
  const searchParams = useSelector(selectSearchParams);
  const courses = useSelector(selectCourses);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedAssignmentType, setSelectedAssignmentType] = useState<string>(AssignmentType.ASSIGNMENT);

  const dispatch = useDispatch();

  const handleResetFilter = useCallback(() => {
    if (courses?.length) {
      setSelectedCourse(joinCoursesCS(courses));
      setSelectedAssignmentType(AssignmentType.ASSIGNMENT);
    }
  }, [courses]);


  useEffect(() => {
    if (courses?.length) {
      dispatch(updateSearchParams({ assignmentType: AssignmentType.ASSIGNMENT, courses: joinCoursesCS(courses) }));
      setSelectedCourse(joinCoursesCS(courses));
    }
  }, [courses, dispatch]);

  useEffect(() => {
    if (selectedAssignmentType) {
      dispatch(updateSearchParams({ ...searchParams, assignmentType: selectedAssignmentType }));
    }
  }, [selectedAssignmentType, dispatch]);

  useEffect(() => {
    if (selectedCourse) {
      dispatch(updateSearchParams({ ...searchParams, courses: selectedCourse }))
    }
  }, [selectedCourse, dispatch]);


  return (
    <>
      {
        showFilter &&
        <Box mt={2} mb={3} p={2} sx={{ background: "rgba(0,0,0,0.05)" }}>
          <Stack direction='row' gap={2} sx={{ maxWidth: "500px" }}>
            {
              searchParams && searchParams.assignmentType && searchParams.courses &&
              <>
                {/* Filter by Assignment Type */}
                <FormControl fullWidth>
                  <InputLabel id="select-assignment-type-label">Assignment Type</InputLabel>
                  <Select
                    labelId="select-assignment-type-label"
                    id="select-assignment-type"
                    label="Assignment Type"
                    value={selectedAssignmentType}
                    onChange={(e:any) => {
                      setSelectedAssignmentType(e.target.value);
                    }}
                  >
                    <MenuItem value={AssignmentType.ASSIGNMENT}>Assignment</MenuItem>
                    <MenuItem value={AssignmentType.SUBMITTED}>Submitted</MenuItem>
                    <MenuItem value={AssignmentType.GRADED}>Graded</MenuItem>
                  </Select>
                </FormControl>
                {/* Filter by Assignment Type */}

                {/* Filter by Course */}
                <FormControl fullWidth>
                  <InputLabel id="select-course-label">Course</InputLabel>
                  <Select
                    labelId="select-course-label"
                    id="select-course"
                    label="Course"
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                    }}
                  >
                    <MenuItem value={joinCoursesCS(courses)}>All</MenuItem>
                    {
                      courses.map((course: any, index: number) => {
                        return (
                          <MenuItem key={index} value={course.value}>{course.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
                {/* Filter by Course */}

                {/*Remove Filters*/}
                <Button variant='outlined' color='secondary' onClick={handleResetFilter}>
                  <RestartAltIcon />
                </Button>
                {/*Remove Filters*/}
              </>
            }
          </Stack>
        </Box>
      }
    </>
  )
}

export default AssignmentFilter