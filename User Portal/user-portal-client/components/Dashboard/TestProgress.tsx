import React, { useMemo } from 'react';
import { Grid, Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses, selectUser } from '@/redux/general/general.slice';
import { useEffect } from 'react';
import { fetchUserAC } from '@/redux/general/actions';
import { ChooseOptions, Container, GraphInfoSec, LineChart, SelectStudent } from './ProgressCommon';
import { UserTypes } from '@/constants/Constants';
import { selectStudents, selectTestData } from '@/redux/stat/stat.slice';
import { SelectCourse } from './ProgressCommon';
import { selectTestProgress } from '@/redux/stat/stat.slice';
import { updateTestProgress } from '@/redux/stat/stat.slice';
import { fetchStudentsAC } from '@/redux/stat/actions';
import { fetchTestProgressDataAC } from '@/redux/stat/actions';
import { joinDDListValues } from '@/utils/filterFunctions';

const TestProgress = () => {
    const user = useSelector(selectUser);
    const students = useSelector(selectStudents);
    const courses = useSelector(selectCourses);
    const testProgress = useSelector(selectTestProgress); // Contains filter parameters of the test results
    const testData = useSelector(selectTestData);
    const studentName = useMemo(() => {
        if (testProgress?.students) {
            const studentsSelected = testProgress.students.split(',');
            if (studentsSelected.length > 1) {
                return 'All'
            } else {
                const name = students?.find((student: any) => student.value === studentsSelected[0]);
                return name?.name || '';
            }
        } else {
            return '';
        }
    }, [testProgress, students]);

    const dispatch = useDispatch();

    const handleCourseChange = (e: any) => {
        dispatch(updateTestProgress({ ...testProgress, courses: e.target.value }));
    }
    const handleStudentChange = (e: any) => {
        dispatch(updateTestProgress({ ...testProgress, students: e.target.value }));
    }
    const handleUpdateTestLimit = (num: number) => {
        dispatch(updateTestProgress({ ...testProgress, take: num }));
    }


    // Side Effects
    useEffect(() => {
        if(testProgress?.students !== '' && testProgress?.courses !== ''){
            dispatch(fetchTestProgressDataAC());
        }
    }, [testProgress, dispatch]);
    useEffect(() => {
        if(courses?.length && user?.role){
            if(user.role === UserTypes.STUDENT){
                dispatch(updateTestProgress({students: user._id, courses: joinDDListValues(courses), take: 10}));
            } else {
                dispatch(updateTestProgress({students: joinDDListValues(students), courses: joinDDListValues(courses), take: 10}));
            }
        }
    }, [students, courses, user, dispatch]);
    useEffect(() => {
        if(user?._id){
            dispatch(fetchStudentsAC());
        }
    }, [user, dispatch])
    useEffect(() => {
        dispatch(fetchUserAC());
    }, [dispatch]);
    // Side Effects


    return (
        <Container>
            <Typography variant="h5" component="p">Test Progress</Typography>
            <Stack direction='row' spacing={2} justifyContent='flex-end'>
                <SelectCourse
                    id='select-course-for-test'
                    label='Select Course'
                    value={testProgress.courses}
                    handleChange={handleCourseChange}
                />
                {
                    user?.role === UserTypes.TEACHER &&
                    <SelectStudent
                        id='select-student-for-tests'
                        label='Select Student'
                        value={testProgress.students}
                        handleChange={handleStudentChange}
                    />
                }
            </Stack>
            <ChooseOptions
                handleChange={handleUpdateTestLimit}
                take={testProgress.take} // Determines the number of test data to take from the api
            />

            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <LineChart type="Test"
                        data={testData}
                    />
                </Grid>

                <Grid item xs={5}>
                    <GraphInfoSec
                        title={"Test"}
                        studentName={studentName}
                        data={testData}
                    />
                </Grid>
            </Grid>

        </Container>
    );
}

export default TestProgress;