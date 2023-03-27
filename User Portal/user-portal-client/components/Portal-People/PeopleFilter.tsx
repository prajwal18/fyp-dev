import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button
} from "@mui/material";
import { UserTypes } from '@/constants/Constants';
import { joinCoursesCS } from '@/utils/filterFunctions';

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from '@/redux/general/general.slice';
import { selectSearchParams, updateSearchParams } from '@/redux/people/people.slice';
// MUI Icon

const PeopleFilter = ({ showFilter }: { showFilter: boolean }) => {
  const [selectedRole, setSelectedRole] = useState(`${UserTypes.STUDENT},${UserTypes.TEACHER}`);
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = useSelector(selectCourses);
  const searchParam = useSelector(selectSearchParams);

  const dispatch = useDispatch();

  const handleResetFilter = useCallback(() => {
    if (courses?.length) {
      setSelectedCourse(joinCoursesCS(courses));
      setSelectedRole(`${UserTypes.STUDENT},${UserTypes.TEACHER}`);
    }
  }, [courses])


  useEffect(() => {
    if (courses?.length) {
      dispatch(updateSearchParams({ role: `${UserTypes.STUDENT},${UserTypes.TEACHER}`, courses: joinCoursesCS(courses) }));
      setSelectedCourse(joinCoursesCS(courses));
    }
  }, [courses, dispatch]);

  useEffect(() => {
    if (selectedRole) {
      dispatch(updateSearchParams({ ...searchParam, role: selectedRole }))
    }
  }, [selectedRole, dispatch]); // Don't add searchParam to the list

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
              searchParam && searchParam.role && searchParam.courses &&
              <>

                {/* Filter by Role */}
                <FormControl fullWidth>
                  <InputLabel id="select-role-label">Role</InputLabel>
                  <Select
                    labelId="select-role-label"
                    id="select-role"
                    label="Role"
                    value={selectedRole}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                    }}
                  >
                    <MenuItem value={`${UserTypes.STUDENT},${UserTypes.TEACHER}`}>Both</MenuItem>
                    <MenuItem value={UserTypes.STUDENT}>Student</MenuItem>
                    <MenuItem value={UserTypes.TEACHER}>Teacher</MenuItem>
                  </Select>
                </FormControl>
                {/* Filter by Role */}

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

export default PeopleFilter;