import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    List, ListItemAvatar, Avatar,
    Button, Typography, Box, Stack
} from "@mui/material";
import styled from 'styled-components';
import Cookies from "universal-cookie";

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Hamburger Close Icon
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Homework Buddy Icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'; // Test
import DriveFolderUploadSharpIcon from '@mui/icons-material/DriveFolderUploadSharp'; // Assignment
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People'; // People
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Logout
// MUI Icons
import { SidebarDataType } from "@/constants/CustomTypes";
import { clearSession, getUserSession } from "@/utils/sessionFuncs";
import { useDispatch } from "react-redux";
import { removeSessionNTokenAC } from "@/redux/general/actions";



// Styled Component
const SidebarContainer = styled(Box)`
    position: fixed;
    top: 0px;
    left: 0px;
    background: linear-gradient(to top, #4b6cb7, #182848);
    min-width: ${(props: any) => props.minimize ? "100px" : "300px"};
    max-width: ${(props: any) => props.minimize ? "100px" : "300px"};
    min-height: 100vh;
    z-index: 3;
    transition: all 200ms;
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
    justify-content: center !important;
    gap: 10px !important;
    padding: 15px !important;
    width: 100% !important;
    margin-top: 5px !important;
    color: black !important;
    border-radius: 50px;
    background: rgba(0 0 0 / 90%);
    &:hover { background: rgb(0 0 0 / 70%) !important; }
`;

const UserInfo = styled(Box)`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const HamburgerBox = styled(Box)`
    position: absolute;
    top: 10px; right: 10px;
    display: flex;
    align-items:center;
    padding: 5px;
    color: #03a9f4;
    background: rgb(0 0 0 / 50%);
    border-radius: 50px;
    cursor: pointer;
    &:hover {
        background: rgb(0 0 0 / 20%);
    }
    &:active {
        background: rgb(0 0 0 / 90%);
    }
`;
// Styled Component

const getSidebarData = (role: string): Array<SidebarDataType> => [
    {
        link: `/${role}/Dashboard`,
        name: "Dashboard",
        icon: <DashboardIcon />
    },
    {
        link: `/${role}/Test`,
        name: "Test",
        icon: <AssignmentSharpIcon />
    },
    {
        link: `/${role}/Assignment`,
        name: "Assignment",
        icon: <DriveFolderUploadSharpIcon />
    },
    {
        link: `/${role}/Message`,
        name: "Message",
        icon: <ForumIcon />
    },
    {
        link: `/${role}/People`,
        name: "People",
        icon: <PeopleIcon />
    },
    {
        link: '/Common/Setting',
        name: "Setting",
        icon: <SettingsIcon/>
    }
];
// Sidebar Data

/**
 * Returns navigation list items
 * @param {label: string, link: string, path:string, icon: any}
 * @returns JSX.Elemnet custom navigation item
 */
const CustomListItem = ({ label, link, path, icon, minimize }: { label: string, link: string, path: string, icon: any, minimize: boolean }) => {

    return (
        <StyledLink href={link} selected={path === link}>
            <ListItemAvatar>
                <Avatar sx={{ color: "white", background: "rgb(255 255 255 / 10%)" }}>
                    {icon}
                </Avatar>
            </ListItemAvatar>
            {
                !minimize &&
                <Typography sx={{ fontSize: "16px", fontWeight: "400", color: "white" }}>{label}</Typography>
            }
        </StyledLink>
    )
}

/**
 * Returns JSX.Element that cotains user session handeling options
 * @params none
 * @returns JSX.Element contains user session handeling options
 */
const BottomSection = ({ minimize }: { minimize: boolean }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleOnLogout = () => {
        dispatch(removeSessionNTokenAC());
        setTimeout(() => { router.push("/Auth/Login"); }, 100);
    }
    return (
        <UserInfo>
            <StyledButton onClick={handleOnLogout}>
                <PowerSettingsNewIcon style={{ color: "white" }} />
                {
                    !minimize &&
                    <Typography component="span" style={{ color: "white", whiteSpace: "nowrap" }}>Log out</Typography>
                }
            </StyledButton>
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
const Sidebar = ({ minimize, setMinimize }: { minimize: boolean, setMinimize: (value: any) => void }) => {
    const [path, setPath] = useState("");
    const [role, setRole] = useState('');
    const { asPath } = useRouter();

    const handleMinimize = () => {
        setMinimize((state: boolean) => !state);
    }

    useEffect(() => {
        setPath(location.pathname);
    }, [asPath]);
    useEffect(() => {
        const session = getUserSession();
        if (session) {
            setRole(session.role);
        }
    }, []);

    return (
        <SidebarContainer minimize={minimize}>
            <Box sx={{
                padding: "50px 10px 5px 10px", display: "flex",
                flexDirection: "column",
                minHeight: '100vh',
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <HamburgerBox onClick={handleMinimize} minimize={minimize}>
                    {
                        minimize ?
                            <ArrowForwardIosIcon />
                            :
                            <MenuIcon />
                    }
                </HamburgerBox>

                {/* Top Section */}
                <Stack sx={{ width: "100%", gap: "20px", alignItems: "space-between" }}>
                    {/*Heading*/}
                    <Stack direction='row' spacing={1} alignItems="center" sx={{ padding: "0 20px", overflow: "hidden" }}>
                        <MenuBookIcon sx={{ color: "white", fontSize: "30px" }} />
                        {
                            !minimize &&
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{ color: "white", fontSize: "22px", whiteSpace: "nowrap" }}
                                title="Homework Buddy"
                            >
                                Homework Buddy
                            </Typography>
                        }
                    </Stack>
                    {/*Navigation Options*/}
                    <List sx={{ width: "100%", padding: "0 10px" }}>
                        {
                            getSidebarData(role).map((data: SidebarDataType, index: number) => (
                                <React.Fragment key={index}>
                                    <CustomListItem
                                        link={data.link}
                                        path={path}
                                        icon={data.icon}
                                        label={data.name}
                                        minimize={minimize}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </List>
                </Stack>
                {/*Bottom Section*/}
                <BottomSection minimize={minimize} />
            </Box>
        </SidebarContainer>
    )
}


export default Sidebar;