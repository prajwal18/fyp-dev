import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, ListItemAvatar, Avatar, Button, Typography, Box } from "@mui/material";
import styled from 'styled-components';

// MUI Icons
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';            // Student
import GroupsIcon from '@mui/icons-material/Groups';                            // Teacher
import ApartmentIcon from '@mui/icons-material/Apartment';                      // Faculty
import SchoolIcon from '@mui/icons-material/School';                            // Course
import SupportAgentIcon from '@mui/icons-material/SupportAgent';                // Admin
import LogoutIcon from '@mui/icons-material/Logout';                            // Logout
import Cookies from "universal-cookie";
import useSession from "../../hooks/useSession";
// MUI Icons

// Styled Component
const SidebarContainer = styled(Box)`
    height: 100%;
    width:100%;
    min-height: 100vh; margin: 0px;
    background: linear-gradient(to bottom, #614385, #516395);
`;
const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${(props: any): string => props.small ? '10px' : '10px'};
    padding: ${(props: any): string => props.small ? '5px' : '5px'};
    width: 100%;
    text-decoration: none;
    background: ${(props: any): string => props.selected ? 'rgb(255 255 255 / 20%)' : 'none'};
    margin-top: 5px;
    color: black;
    border-radius: 5px;
    &:hover {
        background: ${(props: any): string => props.selected ? 'rgb(255 255 255 / 50%)' : (props.type === "bottom") ? '#E5E5E5' : 'rgb(255 255 255 / 20%)'};
    }
    &:active {
        background: #BFBCBC;
    }
`;
const StyledButton = styled(Button)`
    display: flex !important;
    align-items: center !important;
    justify-content: start !important;
    gap: 10px !important;
    padding: 15px 20px !important;
    width: 100% !important;
    margin-top: 5px !important;
    color: black !important;
    border-radius: 5px;
    &:hover { background: rgb(255 255 255 / 10%) !important; }
    &:active { background: #BFBCBC; }
`;

const UserInfo = styled(Box)`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
// Styled Component

// Sidebar Data
type sidebarDataType = {
    link: string,
    name: string,
    icon: JSX.Element
}
const sidebarData: Array<sidebarDataType> = [
    {
        link: "/admin/manage-student",
        name: "Student",
        icon: <GroupsOutlinedIcon />
    },
    {
        link: "/admin/manage-teacher",
        name: "Teacher",
        icon: <GroupsIcon />
    },
    {
        link: "/admin/manage-faculty",
        name: "Faculty",
        icon: <ApartmentIcon />
    },
    {
        link: "/admin/manage-course",
        name: "Course",
        icon: <SchoolIcon />
    },
    {
        link: "/admin/manage-admin",
        name: "Admin",
        icon: <SupportAgentIcon />
    }
];
// Sidebar Data

/**
 * Returns navigation list items
 * @param {label: string, link: string, path:string, icon: any}
 * @returns JSX.Elemnet custom navigation item
 */
const CustomListItem = ({ label, link, path, icon }: { label: string, link: string, path: string, icon: any }) => {

    return (
        <StyledLink to={link} selected={path === link}>
            <ListItemAvatar>
                <Avatar sx={{ color: "white", background: "rgb(255 255 255 / 10%)" }}>
                    {icon}
                </Avatar>
            </ListItemAvatar>
            <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "white" }}>{label}</Typography>
        </StyledLink>
    )
}

/**
 * Returns JSX.Element that cotains user session handeling options
 * @params none
 * @returns JSX.Element contains user session handeling options
 */
const BottomSection = () => {
    const cookies = new Cookies();
    const { clearSession } = useSession("fyp_session");
    const navigate = useNavigate();
    const handleOnLogout = () => {
        clearSession();
        cookies.remove('fyp_token');
        navigate("/login");
    }
    return (
        <UserInfo>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%", }}>
                <StyledButton onClick={handleOnLogout}>
                    <LogoutIcon style={{ color: "white" }} />
                    <Typography component="span" style={{ color: "white" }}>Log out</Typography>
                </StyledButton>
            </Box>
        </UserInfo>
    )
}

/**
 * Returns Sidebar component, which is used for navigation and is present throughout the application 
 * after the user logs in to the application
 * 
 * @params - none 
 * @returns JSX.Element Sidebar that is used for navigation
 */
const Sidebar = () => {
    const [path, setPath] = useState("");
    const location = useLocation();

    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    return (
        <SidebarContainer>
            <Box sx={{
                padding: "40px 10px 5px 10px", display: "flex",
                flexDirection: "column", gap: "20px",
                minHeight: '100vh',
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                {/* Top Section */}
                <Box sx={{ display: "flex", width: "100%", flexDirection: "column", gap: "30px", alignItems: "center" }}>
                    {/*Heading*/}
                    <Typography variant="h5" component="span" sx={{ color: "white" }}> Admin Portal</Typography>
                    {/*Navigation Options*/}
                    <List sx={{ width: "100%", padding: "0 10px" }}>
                        {
                            sidebarData.map((data: sidebarDataType, index: number) => (
                                <React.Fragment key={index}>
                                    <CustomListItem
                                        link={data.link}
                                        path={path}
                                        icon={data.icon}
                                        label={data.name}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </List>
                </Box>
                {/*Bottom Section*/}
                <BottomSection />
            </Box>
        </SidebarContainer>
    )
}


export default Sidebar;