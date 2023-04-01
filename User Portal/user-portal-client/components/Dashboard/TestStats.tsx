import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { SelectCourse } from './ProgressCommon';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchParam, selectTestStat, updateTestCourses } from '@/redux/stat/stat.slice';
import { selectCourses } from '@/redux/general/general.slice';
import { fetchTestStatAC } from '@/redux/stat/actions';
import { joinDDListValues } from '@/utils/filterFunctions';


const generateTestData = (data: [number, number, number]) => ({
    labels: ['Tests', 'Toal Submitted', 'Total Graded'],
    datasets: [
        {
            label: 'Courses',
            data: data,
            backgroundColor: [
                'rgba(67, 66, 68, 0.2)',
                'rgba(121, 213, 129, 0.5)',
                'rgba(177, 67, 186, 0.5)'
            ],
            borderColor: [
                'rgba(67, 66, 68, 0.5)',
                'rgba(121, 213, 129, 1)',
                'rgba(177, 67, 186, 1)'
            ],
            borderWidth: 1,
        }
    ]
})

const TestGraph = ({ stat }: { stat: [number, number, number] }) => {
    const [chartData, setChartData] = useState<any>({});
    useEffect(() => {
        setChartData(generateTestData(stat))
    }, [stat]);

    return (
        <>
            {
                chartData?.labels &&
                <Doughnut data={chartData} />
            }
        </>
    )
}


const TestStat = ({ stat, course, testCourses, handleChange }: { stat: [number, number, number], course: string, testCourses: string, handleChange: (value: any) => void }) => {

    return (
        <Grid item xs={6}>
            <Stack spacing={2} justifyItems='center' direction='row'>
                <TestGraph stat={stat} />
                <Box sx={{ minWidth: "100%" }}>
                    <Box mb={3} sx={{ paddingRight: "20px" }}>
                        <SelectCourse
                            id='select-course-test'
                            label='Select Course'
                            value={testCourses}
                            handleChange={handleChange}
                        />
                    </Box>

                    <Typography variant='h5' component='p'>{course}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={2}>Total Tests: {stat[0]}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={1}>Submitted Tests: {stat[1]}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={1}>Graded Tests: {stat[2]}</Typography>
                </Box>
            </Stack>
        </Grid>
    );
}

const TestStats = () => {
    const testStats = useSelector(selectTestStat);
    const searchParam = useSelector(selectSearchParam);
    const courses = useSelector(selectCourses);
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        dispatch(updateTestCourses(e.target.value))
    }

    useEffect(() => {
        if (searchParam?.testCourses && searchParam.testCourses !== '') {
            dispatch(fetchTestStatAC());
        }
    }, [dispatch, searchParam.testCourses]);

    useEffect(() => {
        dispatch(updateTestCourses(joinDDListValues(courses)))
    }, [courses, dispatch]);

    return (
        <Stack direction='column' spacing={2} sx={{ background: "white", borderRadius: "5px", padding: "20px" }}>
            <Box>
                <Typography variant="h5" component="p">Test Stats</Typography>
            </Box>
            <Grid container spacing={2}>
                {
                    searchParam?.testCourses !== '' &&
                    <TestStat
                        stat={[testStats.total, testStats.submitted, testStats.graded]}
                        course={testStats.course}
                        testCourses={searchParam.testCourses}
                        handleChange={handleChange}
                    />
                }
            </Grid>
        </Stack>
    )
}

export default TestStats;