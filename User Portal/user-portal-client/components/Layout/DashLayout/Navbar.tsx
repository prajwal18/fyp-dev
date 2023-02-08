import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import styled from "styled-components";
//MUI icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
//MUI icons
import { sidebarData as topNavLinkData, isCurrentLocation } from "./Sidebar";                                      // Importing NavigationLink data from links


// Styled Components
const NavLinks = styled(Link)`
    width:100%; padding: 10px;
    border-radius: 5px;
    display: flex;
    gap: 20px;
    align-items:center;
    text-decoration: none;
    color: white;
    background: ${(props: any) => props.selected ? "#395A68" : "#A789E5"};
    &:hover {
        background: ${(props: any) => props.selected ? "#395A68" : "rgba(0,0,0,0.4)"};
    }
    &:active {
        background: rgba(0,0,0,0.8);
    }
`;
const NavbarContainer = styled(Stack)`
    position: ${(props: any) => props.expand ? "fixed" : "relative"};
    height: 100%; width: 100%;
    color: white;
    background: #A789E5;
    top: 0px; left:0px;
    display: none;

    @media (max-width: 1100px){
        display: flex;
    }
`;
const CustomButton = styled(Button)`
    display: flex;
    color: white;
    padding: 8px 0px;
    border: 1px solid white;
`;
// Styled Components

const HeadSection = ({ setExpand }: { setExpand: (value: any) => void }) => {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between", padding: "10px", background: "#A789E5" }}>
            <Stack direction='row' spacing={1} sx={{ padding: "10px 20px", alignItems: "center", justifyContent: "center", color: "white", background: "#A789E5" }}>
                <MenuBookIcon fontSize="large" sx={{ color: "#white" }} />
                <Typography variant="h5" component="h1" sx={{ color: "white", textAlign: "center" }}>Homework Buddy</Typography>
            </Stack>
            <CustomButton variant="outlined"
                onClick={() => {
                    setExpand((expand: boolean) => {
                        return !expand
                    })
                }}
            >
                <MenuIcon />
            </CustomButton>
        </Stack>

    )
}

const AllNavLinks = () => {
    const { asPath } = useRouter();
    return (
        <Stack sx={{ width: "100%", padding: "20px" }} spacing={1}>
            {
                topNavLinkData.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                        <NavLinks href={item.path} selected={isCurrentLocation(asPath, item.href)}>
                            {item.icon}
                            <Typography>{item.name}</Typography>
                        </NavLinks>
                    </React.Fragment>
                ))
            }
            <Box></Box>
            <Box></Box>
            <NavLinks href="/Dashboard" selected={isCurrentLocation(asPath, '/Dashboard')}>
                <PersonIcon/>
                <Typography sx={{ fontSize: "1.1rem" }} component="p">Profile</Typography>
            </NavLinks>
            <NavLinks href="/Auth/Login" >
                <SettingsIcon />
                <Typography sx={{ fontSize: "0.9rem" }} component="p">Settings</Typography>
            </NavLinks>
            <NavLinks href="/Auth/Login">
                <LogoutIcon />
                <Typography sx={{ fontSize: "0.9rem" }} component="p">Logout</Typography>
            </NavLinks>
        </Stack>
    )
}

const Navbar = () => {
    const [expand, setExpand] = useState(false);
    return (
        <NavbarContainer spacing={1} expand={expand}>
            <HeadSection setExpand={setExpand} />

            {
                expand && <AllNavLinks />
            }

        </NavbarContainer>
    )
}

export default Navbar;