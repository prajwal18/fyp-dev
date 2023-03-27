import React, { useState, useCallback, useEffect } from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button

} from "@mui/material";
import { joinCoursesCS } from '@/utils/filterFunctions';

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchParams, updateSearchParams } from '@/redux/test/test.slice';
import { selectCourses } from '@/redux/general/general.slice';
import { TestType } from '@/constants/Constants';
// MUI Icon

const TestFilter = ({ showFilter }: { showFilter: boolean }) => {
  const searchParams = useSelector(selectSearchParams);
  const courses = useSelector(selectCourses);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTestType, setSelectedTestType] = useState<string>(TestType.TEST_PAPER);

  const dispatch = useDispatch();

  const handleResetFilter = useCallback(() => {
    if (courses?.length) {
      setSelectedCourse(joinCoursesCS(courses));
      setSelectedTestType(TestType.TEST_PAPER);
    }
  }, [courses])


  useEffect(() => {
    if (courses?.length) {
      dispatch(updateSearchParams({ testType: TestType.TEST_PAPER, courses: joinCoursesCS(courses) }));
      setSelectedCourse(joinCoursesCS(courses));
    }
  }, [courses, dispatch]);

  useEffect(() => {
    if (selectedTestType) {
      dispatch(updateSearchParams({ ...searchParams, testType: selectedTestType }))
    }
  }, [selectedTestType, dispatch]); // Don't add searchParamss to the list

  useEffect(() => {
    if (selectedCourse) {
      dispatch(updateSearchParams({ ...searchParams, courses: selectedCourse }))
    }
  }, [selectedCourse, dispatch]); // Don't add searchParamss to the list
  return (
    <>
      {
        showFilter &&
        <Box mt={2} mb={3} p={2} sx={{ background: "rgba(0,0,0,0.05)" }}>
          <Stack direction='row' gap={2} sx={{ maxWidth: "500px" }}>
            {
              searchParams && searchParams.testType && searchParams.courses &&
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