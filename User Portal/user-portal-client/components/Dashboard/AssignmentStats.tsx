import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Box, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DDOptionT } from '@/constants/CustomTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from '@/redux/general/general.slice';
import { joinDDListValues } from '@/utils/filterFunctions';
import { selectAssignmentStat, selectSearchParam, updateAssignmentCourses } from '@/redux/stat/stat.slice';
import { fetchAssignmentStatAC } from '@/redux/stat/actions';
import { SelectCourse } from './ProgressCommon';


const generateAssignmentData = (data: [number, number, number]) => ({
    labels: ['Assignments', 'Total Submitted', 'Total Graded'],
    datasets: [
        {
            label: 'Courses',
            data: data,
            backgroundColor: [
                'rgba(67, 66, 68, 0.2)',
                'rgba(191, 230, 64, 0.5)',
                'rgba(124, 58, 214, 0.5)'
            ],
            borderColor: [
                'rgba(67, 66, 68, 0.5)',
                'rgba(191, 230, 64, 1)',
                'rgba(124, 58, 214, 1)'
            ],
            borderWidth: 1,
        }
    ]
})

const AssignmentGraph = ({ stat }: { stat: [number, number, number] }) => {
    const [chartData, setChartData] = useState<any>({});
    useEffect(() => {
        setChartData(generateAssignmentData(stat))
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


const AssignmentStat = ({ stat, course, assignmentCourses, handleChange }: { stat: [number, number, number], course: string, assignmentCourses: string, handleChange: (value: any) => void }) => {

    return (
        <Grid item xs={6}>
            <Stack spacing={2} justifyItems='center' direction='row'>
                <AssignmentGraph stat={stat} />
                <Box sx={{ minWidth: "100%" }}>
                    <Box mb={3} sx={{ paddingRight: "20px" }}>
                        <SelectCourse
                            id='select-course-assignment'
                            label='Select Course'
                            value={assignmentCourses}
                            handleChange={handleChange}
                        />
                    </Box>

                    <Typography variant='h5' component='p'>{course}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={2}>Total Assigments: {stat[0]}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={1}>Submitted Assigments: {stat[1]}</Typography>
                    <Typography sx={{ color: "#5c5b5a" }} mt={1}>Graded Assigments: {stat[2]}</Typography>
                </Box>
            </Stack>
        </Grid>
    );
}

const AssignmentStats = () => {
    const assignmentStat = useSelector(selectAssignmentStat);
    const searchParam = useSelector(selectSearchParam);
    const courses = useSelector(selectCourses);
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        dispatch(updateAssignmentCourses(e.target.value))
    }

    useEffect(() => {
        if (searchParam?.assignmentCourses && searchParam.assignmentCourses !== '') {
            dispatch(fetchAssignmentStatAC());
        }
    }, [dispatch, searchParam.assignmentCourses]);

    useEffect(() => {
        dispatch(updateAssignmentCourses(joinDDListValues(courses)))
    }, [courses, dispatch]);
    return (
        <Stack direction='column' spacing={2} sx={{ background: "white", borderRadius: "5px", padding: "20px" }}>
            <Box>
                <Typography variant="h5" component="p">Assignment Stats</Typography>
            </Box>
            <Grid container spacing={2}>
                <AssignmentStat
                    stat={[assignmentStat.total, assignmentStat.submitted, assignmentStat.graded]}
                    course={assignmentStat.course}
                    assignmentCourses={searchParam.assignmentCourses}
                    handleChange={handleChange}
                />
            </Grid>
        </Stack>
    )
}

export default AssignmentStats;