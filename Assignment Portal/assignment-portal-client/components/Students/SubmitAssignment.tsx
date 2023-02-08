import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
// MUI Icon
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
// MUI Icon
import DashLayout from '../Layout/DashLayout/DashLayout';
import { CustTypography, LabelTypo } from '../Common/ContainersNButtons';


const SubmitAssignmentContainer = () => {
    return (
        <Box sx={{ padding: "30px", backgroundColor: "white", width: "100%" }}>
            <Stack direction="row" sx={{ gap: "50px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <Box>
                    <Box sx={{ padding: "10px", borderBottom: "2px solid #3862fc" }}>
                        <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#3862fc" }}>Assignment 2: Psychology</Typography>
                        <CustTypography sx={{ fontSize: "0.9rem" }}>Mero Raja Pradhan &middot; 8<sup>th</sup> January</CustTypography>
                    </Box>

                    <CustTypography sx={{ fontSize: "1.2rem", mt: 4 }}>English Groupwork</CustTypography>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <LabelTypo>Total Weightage:</LabelTypo>
                        <CustTypography>40%</CustTypography>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <LabelTypo>Assigned Date:</LabelTypo>
                        <CustTypography>10<sup>th</sup> January 2023</CustTypography>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <LabelTypo>Due Date:</LabelTypo>
                        <CustTypography>1<sup>st</sup> March 2023</CustTypography>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <LabelTypo>Description:</LabelTypo>
                        <CustTypography sx={{ maxWidth: "400px" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Explicabo iure, earum reprehenderit natus iste
                            tenetur similique magni temporibus nesciunt
                            voluptate sint quae? Ab, natus? Animi nisi molestiae
                            repudiandae earum provident?
                        </CustTypography>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems:"center" }}>
                        <LabelTypo>Download Manual:</LabelTypo>
                        <Button color="info" variant="contained">
                            <DownloadIcon />
                            <Typography>&nbsp; Download File</Typography>
                        </Button>
                    </Stack>
                </Box>
                <Box sx={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.3)", width: "300px", padding: "20px", borderRadius: "5px", mt: 5 }}>
                    <Stack direction="row" sx={{ gap: "20px", alignItems: "center", justifyContent: "space-between" }}>
                        <CustTypography sx={{ fontSize: "18px" }}>Your Work</CustTypography>
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "700" }}>Assign</Typography>
                    </Stack>
                    <Button variant="outlined" sx={{ textTransform: "capitalize", width: "100%", padding: "5px", mt: 2 }}>
                        <AddIcon />
                        <Typography> &nbsp; Add assignment</Typography>
                    </Button>
                    <Button variant="contained" sx={{ textTransform: "capitalize", width: "100%", padding: "5px", mt: 1 }}>
                        <Typography>Mark As Done</Typography>
                    </Button>
                </Box>
            </Stack>

        </Box>
    );
}

const SubmitAssignment = () => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <SubmitAssignmentContainer />
            </Box>
        </DashLayout>
    )
}

export default SubmitAssignment;