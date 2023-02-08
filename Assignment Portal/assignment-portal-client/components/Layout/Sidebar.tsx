
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Stack, Typography, Box } from "@mui/material";          // MUI Components
import styled from "styled-components";                     // Styled Component
//MUI icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
//MUI icons
import UploadImg from "@/public/Images/uploadImg.png";
import { useRouter } from "next/router";

// Importing Sidebar data
import { studentSidebarData, teacherSidebarData, isCurrentLocation } from "./NavigationUtils";


// Styled Components
const SuperLink = styled(Link)`
    width:100%;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    gap: 20px;
    align-items:center;
    text-decoration: none;
    color: #4F4F4F !important;
`;
const BottomLink = styled(SuperLink)`
    background: ${(props: any) => props.selected ? "#E2DCE5" : "white"};
    &:hover {
        background: ${(props: any) => props.selected ? "#E2DCE5" : "#FEF7FF"};
    }
    &:active {
        background: #E2D6FA;
        color: #A789E5 !important;
    }
`;
const TopLinks = styled(SuperLink)`
    background: ${(props: any) => props.selected ? "#D7DFE2" : "white"};
    color: ${(props: any) => props.selected ? "#9747FF" : "#4F4F4F"} !important;
    &:hover {
        background: ${(props: any) => props.selected ? "#D7DFE2" : "#F1FBFF"};
    }
    &:active {
        background: #E2D6FA;
        color: #A789E5 !important;
    }
`;
const SidebarContainer = styled(Stack)`
    position: fixed; height: 100vh;
    top:0px; left:0px;
    width: 100%; max-width: 400px; padding: 10px 0px 2px 0px;
    justify-content: space-between; align-items: center;
    background: white;

    @media (max-width: 1300px){
        max-width: 350px;
    }
    @media (max-width: 1200px){
        max-width: 300px;
    }
    @media (max-width: 1100px){
        display:none;
    }

`;
// Styled Components


const Sidebar = () => {
    return (
        <SidebarContainer className="dash-sidebar">
            <TopNavigation />
            <BottomNavigation />
        </SidebarContainer>
    )
}

const TopNavigation = () => {
    const { asPath } = useRouter();
    const [sidebarData, setSidebarData] = useState(studentSidebarData);
    useEffect(() => {
        if(asPath.includes('/Student/')){
            setSidebarData(studentSidebarData);
        } else if(asPath.includes('/Teacher/')){
            setSidebarData(teacherSidebarData);
        }
    }, [asPath]);
    return (
        <Stack sx={{ width: "100%", padding: "20px" }} spacing={1}>
            <Box sx={{ backgroundColor: "#9747FF", color: "white", textAlign: "center", width: "100%", padding: "1px 20px" }}>
                <Typography sx={{fontSize:"0.8rem", fontWeight:"700"}}>TEST - PORTAL</Typography>
            </Box>
            <Stack direction="row" spacing={2} sx={{ paddingLeft: "20px" }}>
                <MenuBookIcon fontSize="large" sx={{ color: "#9747FF" }} />
                <Typography variant="h5" component="h1" sx={{ color: "#9747FF", textAlign: "center" }}>Homework Buddy</Typography>
            </Stack>
            
            <Box sx={{height:"10px",width:"100%", borderBottom:"1px solid #9747FF"}}></Box><Box sx={{height:"10px"}}></Box> {/* Just to add extra spacing */}

            {
                sidebarData.map((item: any, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <TopLinks href={item.path} selected={isCurrentLocation(asPath, item.path)}>
                                <item.icon/>
                                <Typography sx={{ fontSize: "1.1rem" }}>{item.name}</Typography>
                            </TopLinks>
                        </React.Fragment>
                    )
                })
            }
        </Stack>
    )
}

const BottomNavigation = () => {
    const { asPath } = useRouter();
    return (
        <Stack sx={{
            width: "90%", padding: "20px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            border: "2px solid #A8A8A8"
        }} spacing={1}>
            <BottomLink href="/Dashboard" selected={isCurrentLocation(asPath, '/Dashboard')}>
                <Image height={50} width={50} style={{ borderRadius: "50%", border: "2px solid grey" }} alt="Profile Picture" src={UploadImg} />
                <Typography sx={{ fontSize: "1.1rem" }} component="p">Prajwal Gautam</Typography>
            </BottomLink>
            <BottomLink href="/Auth/Login" >
                <SettingsIcon />
                <Typography sx={{ fontSize: "0.9rem" }} component="p">Settings</Typography>
            </BottomLink>
            <BottomLink href="/Auth/Login">
                <LogoutIcon />
                <Typography sx={{ fontSize: "0.9rem" }} component="p">Logout</Typography>
            </BottomLink>
        </Stack>
    )
}

export default Sidebar;