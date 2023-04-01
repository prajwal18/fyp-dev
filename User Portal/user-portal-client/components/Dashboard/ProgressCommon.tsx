import { useEffect } from 'react';
import {
    FormControl, Button, Typography,
    Box, InputLabel, Select, Stack,
    MenuItem
} from "@mui/material";
import styled from "styled-components";
import { Line } from 'react-chartjs-2';
//Mui Icons
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { DDOptionT } from "@/constants/CustomTypes";
//Mui Icons

// Precautions
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useDispatch, useSelector } from "react-redux";
import { selectStudents } from "@/redux/stat/stat.slice";
import { fetchStudentsAC } from '@/redux/stat/actions';
import { joinDDListValues } from '@/utils/filterFunctions';
import { selectCourses } from '@/redux/general/general.slice';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
// Precautions


//
const generateCustomData = (labels: Array<string>, data: Array<number>, type: string) => {
    const chartData = {
        labels: labels || [],
        datasets: [{
            label: type,
            data: data || [],
            fill: true,
            borderColor: getSpecificColor(type),
            tension: 0.1
        }]
    }
    return chartData;
}
//

// Custom Colors
const getSpecificColor = (type: string) => {
    if (type === 'Assignment') {
        return "rgba(151, 71, 255, 1)";
    } else {
        return "rgba(242, 153, 74, 1)";
    }
}
// Custom Colors

export const Container = styled(Box)`
    background: white; padding: 20px; border-radius: 5px;
    display: flex; flex-direction: column; gap: 20px;
  `;

const ChooseOptCont = styled(Box)`
    display: flex; gap: 20px; 
    justify-content: flex-end;
    align-items: center;
`;

const StatsBtn = styled(Button)`
    padding: 5px 10px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    background: ${(props: any): any => props.selected ? "rgba(214, 220, 236, 1)" : "white"} !important;
    color: ${(props: any): any => props.selected ? "rgba(49, 80, 161, 1)" : "black"} !important;
`;

const GraphChip = styled(Box)`
    display: flex; gap: 10px; padding: 5px 15px;
    border-radius: 20px;
    color: ${(props: any): any => props.color};
    background: ${(props: any): any => props.bg};
`;

export function SelectCourse({ id, label, value, handleChange }: { id: string, label: string, value: string, handleChange: (value: any) => void }) {
    const courses = useSelector(selectCourses);
    return (
        <>
            {
                courses?.length &&
                <Box sx={{ width: "50%" }}>
                    <FormControl fullWidth>
                        <InputLabel id={`${id}-label`}>{label}</InputLabel>
                        <Select
                            labelId={`${id}-label`}
                            id={id}
                            defaultValue=''
                            value={value}
                            label={'Select Course'}
                            onChange={handleChange}
                        >
                            <MenuItem value={joinDDListValues(courses)}>All</MenuItem>
                            {
                                courses.map((option: DDOptionT, index: number) => {
                                    return (
                                        <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            }
        </>
    )
}

export const SelectStudent = ({ id, label, value, handleChange }: { id: string, label: string, value: string, handleChange: (value: any) => void }) => {
    const students = useSelector(selectStudents);
    return (
        <>
            {
                students?.length &&
                <Box sx={{ width: "50%" }}>
                    <FormControl fullWidth>
                        <InputLabel id={`${id}-label`}>{label}</InputLabel>
                        <Select
                            labelId={`${id}-label`}
                            id={id}
                            defaultValue=''
                            value={value}
                            label={'Select Course'}
                            onChange={handleChange}
                        >
                            <MenuItem value={joinDDListValues(students)}>All</MenuItem>
                            {
                                students.map((option: DDOptionT, index: number) => {
                                    return (
                                        <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            }
        </>
    )
}

export const ChooseOptions = ({ handleChange, take }: { handleChange: (value: any) => void, take: number }) => {
    return (
        <ChooseOptCont>
            <StatsBtn variant="text"
                selected={take === 10}
                onClick={() => handleChange(10)}
            >
                Last 10
            </StatsBtn>
            <StatsBtn variant="text"
                selected={take === 20}
                onClick={() => handleChange(20)}
            >
                20
            </StatsBtn>
            <StatsBtn variant="text"
                selected={take === 30}
                onClick={() => handleChange(30)}
            >
                30
            </StatsBtn>
            <StatsBtn variant="text"
                selected={take === 0}
                onClick={() => handleChange(0)}
            >
                All
            </StatsBtn>
        </ChooseOptCont>
    );
}

export const GraphInfoSec = ({ data, title, studentName }: { data: any, title: string, studentName: string }) => {
    const color = getSpecificColor(title);
    const calcAverage = (list: any) => {
        let sum = (list || []).reduce((current: number, sum: number) => current + sum, 0);
        let average = sum / (list?.length || 1)
        return average;
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "start" }}>
            <Typography variant="h4" component="p" sx={{ color: color }}>{studentName}</Typography>
            <Typography>Check your progress on {title}.</Typography>

            <Stack spacing={1} mt={2} sx={{ padding: "0px 10px" }}>
                <Typography sx={{ color: "#5c5b5a" }}>Average score: {calcAverage(data?.datasets)}</Typography>

                <Stack direction='row' spacing={2} alignItems='center'>
                    <Typography sx={{ color: "#5c5b5a" }}>Latest score: {data?.datasets?.slice(-1)}</Typography>
                    <ProgressChip current={data?.datasets?.slice(-1) || 0} average={calcAverage(data?.datasets)} />
                </Stack>
            </Stack>

        </Box>
    )
}

export const ProgressChip = ({ current, average }: { current: number, average: number }) => {
    const didImprove = () => {
        return current >= average;
    }
    const calcDiffPercentage = () => {
        if (average == 0) return 0;
        return Math.ceil(Math.abs((average - current) * 100 / average))
    }

    const getColor = (opacity: string) => {
        return didImprove() ? `rgba(33, 150, 83, ${opacity})` : `rgba(235, 87, 87, ${opacity})`
    }

    return (
        <GraphChip color={getColor('1')} bg={getColor('0.2')}>
            {
                didImprove() ?
                    <CallMadeIcon />
                    :
                    <CallReceivedIcon />
            }
            <Typography>{calcDiffPercentage()}%</Typography>
        </GraphChip>
    )
}

export const LineChart = ({ data, type }: { data: { labels: any, datasets: any }, type: string }) => {

    return (
        <Line
            data={generateCustomData(data?.labels, data?.datasets, type)}
        />
    )
}