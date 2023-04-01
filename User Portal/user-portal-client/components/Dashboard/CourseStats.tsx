import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseStat } from '@/redux/stat/stat.slice';
import { fetchCourseStatAC } from '@/redux/stat/actions';


const generateCourseData = (data: [number, number]) => ({
    labels: ['All Courses', 'Courses your registered in'],
    datasets: [
        {
            label: 'Courses',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
        }
    ]
})

const MyCourses = ({ courseStat }: { courseStat: any }) => {
    const [chartData, setChartData] = useState<any>({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCourseStatAC());
    }, [dispatch]);

    useEffect(() => {
        setChartData(generateCourseData([courseStat.registered, courseStat.total]))
    }, [courseStat])

    return (
        <>
            {
                chartData?.labels &&
                <Doughnut data={chartData} />
            }
        </>
    )
}

const CourseStats = () => {
    const courseStat = useSelector(selectCourseStat);
    return (
        <Stack direction='row' spacing={5} alignItems='center' sx={{ background: "white", borderRadius: "5px", padding: "20px" }}>
            <Box>
                <Typography variant="h5" component="p" mb={2}>Course Stats</Typography>
                <MyCourses courseStat={courseStat} />
            </Box>
            <Box>
                <Typography variant="h3" component="p">
                    {
                        courseStat.total
                    }
                </Typography>
                <Typography sx={{ color: "#5c5b5a" }}>
                    All Courses
                </Typography>
                <Typography mt={2} variant="h4" component="p" sx={{ color: "#5c5b5a" }}>
                    {courseStat.registered}/{courseStat.total}
                </Typography>
                <Typography sx={{ color: "#91908e" }}>
                    Courses you are registered in
                </Typography>
            </Box>
        </Stack>
    )
}

export default CourseStats;