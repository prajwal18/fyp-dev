import React, { useState, useCallback, useEffect } from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button

} from "@mui/material";

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchParams, updateSearchParams } from '@/redux/test/test.slice';
import { selectCourses } from '@/redux/general/general.slice';
import { TestType } from '@/constants/Constants';
// MUI Icon

const TestFilter = ({ showFilter }: { showFilter: boolean }) => {
  const searchParam = useSelector(selectSearchParams);
  const courses = useSelector(selectCourses);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTestType, setSelectedTestType] = useState<string>(TestType.ALL);

  const dispatch = useDispatch();

  const joinCoursesCS = (courses: Array<any>) => {
    const coursesIds = courses.map(course => {
      return course.value
    });
    return coursesIds.join(',');
  }

  const handleResetFilter = useCallback(() => {
    if (courses?.length) {
      setSelectedCourse(joinCoursesCS(courses));
      setSelectedTestType(TestType.ALL);
    }
  }, [courses])


  useEffect(() => {
    if (courses?.length) {
      dispatch(updateSearchParams({ testType: TestType.ALL, courses: joinCoursesCS(courses) }));
      setSelectedCourse(joinCoursesCS(courses));
    }
  }, [courses, dispatch]);

  useEffect(() => {
    if (selectedTestType) {
      dispatch(updateSearchParams({ ...searchParam, testType: selectedTestType }))
    }
  }, [selectedTestType, dispatch]); // Don't add searchParam to the list

  useEffect(() => {
    if (selectedCourse) {
      dispatch(updateSearchParams({ ...searchParam, courses: selectedCourse }))
    }
  }, [selectedCourse, dispatch]); // Don't add searchParam to the list
  return (
    <>
      {
        showFilter &&
        <Box mt={2} mb={3} p={2} sx={{ background: "rgba(0,0,0,0.05)" }}>
          <Stack direction='row' gap={2} sx={{ maxWidth: "500px" }}>
            {
              searchParam && searchParam.testType && searchParam.courses &&
              <>
                {/* Filter by Test Type */}
                <FormControl fullWidth>
                  <InputLabel id="select-Test-Type-label">Test Type</InputLabel>
                  <Select
                    labelId="select-Test-Type-label"
                    id="select-Test-Type"
                    label="Test Type"
                    value={selectedTestType}
                    onChange={(e) => {
                      setSelectedTestType(e.target.value);
                    }}
                  >
                    <MenuItem value={TestType.ALL}>All</MenuItem>
                    <MenuItem value={TestType.TEST_PAPER}>Test Paper</MenuItem>
                    <MenuItem value={TestType.SUBMITTED}>Submitted</MenuItem>
                    <MenuItem value={TestType.GRADED}>Graded</MenuItem>
                  </Select>
                </FormControl>
                {/* Filter by Test Type */}

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

export default TestFilter