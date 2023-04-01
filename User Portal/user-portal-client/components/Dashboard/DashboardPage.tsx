import React from "react";
import {
    Box, Grid
} from '@mui/material';
import HeaderInfo from "./HeaderInfo";
import CourseStats from "./CourseStats";
import { Stack } from "@mui/system";
import AssignmentStats from "./AssignmentStats";
import TestStats from "./TestStats";
import AssignmentProgress from "./AssignmentProgress";
import TestProgress from "./TestProgress";

// To use chart js in this project
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
// To use chart js in this project


const DashboardPage = () => {
    return (
        <Box>
            <HeaderInfo />

            <Grid mt={2} container spacing={2}>
                <Grid item xs={6}>
                    <Stack spacing={2}>
                        <AssignmentStats />
                        <TestStats />
                        <CourseStats />
                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <Stack spacing={2}>
                        <AssignmentProgress />
                        <TestProgress />
                    </Stack>
                </Grid>
            </Grid>

        </Box>
    )
}

export default DashboardPage;