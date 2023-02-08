import React from 'react';
import {Box} from "@mui/material";
import DashLayout from '../Layout/DashLayout/DashLayout';
import { CustTypography } from '../Common/ContainersNButtons';

const DashboardPageContainer = () => {
    return(
        <Box sx={{background:"white", padding:"20px"}}>
          <CustTypography>Dashboard - comming soon</CustTypography>
        </Box>
    )
}

const DashboardPage = () => {
  return (
    <DashLayout>
        <Box sx={{padding:"20px"}}>
            <DashboardPageContainer/>
        </Box>
    </DashLayout>
  )
}


export default DashboardPage;