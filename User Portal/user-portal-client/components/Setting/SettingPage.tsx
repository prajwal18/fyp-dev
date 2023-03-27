import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DraftsIcon from '@mui/icons-material/Drafts';
import PasswordIcon from '@mui/icons-material/Password';
import ChangePasswordModal from "@/components/ChangeForgotPassword/ChangePasswordModal";
import ViewProfileModal from "@/components/ViewEditProfile/ViewProfileModal";
import EditProfileModal from "@/components/ViewEditProfile/EditProfileModal";
// Redux functions
import { fetchUserAC } from "@/redux/general/actions";
import { selectOpenProfile, updateOpenProfile } from "@/redux/general/general.slice";
// Redux functions


export default function SettingPage() {
    const [openCP, setOpenCP] = useState(false);
    const openViewProfile = useSelector(selectOpenProfile);
    const [openEditProfile, setOpenEditProfile] = useState(false);

    const dispatch = useDispatch();

    const setOpenViewProfile = (value: boolean) => {
        dispatch(updateOpenProfile(value));
    }

    const handleOpenCP = () => {
        dispatch(fetchUserAC());
        setOpenCP(true);
    }
    const handleOpenViewProfile = () => {
        dispatch(fetchUserAC());
        setOpenViewProfile(true);
    }
    const handleOpenEditProfile = () => {
        dispatch(fetchUserAC());
        setOpenViewProfile(false);
        setOpenEditProfile(true);
    }

    return (
        <>
            <Box sx={{ padding: "20px" }}>
                <Box sx={{ padding: "20px", background: "white" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant='h4' component='h2' mb={1} >Setting</Typography>
                    </Box>
                    <List sx={{ display: "flex", gap: 2 }}>
                        <ListItem disablePadding sx={{ color: "gray", border: 1, borderRadius: 2 }}>
                            <ListItemButton onClick={handleOpenCP}>
                                <ListItemIcon>  <PasswordIcon /></ListItemIcon>
                                <ListItemText primary="Change Password" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ color: "gray", border: 1, borderRadius: 2 }}>
                            <ListItemButton onClick={handleOpenViewProfile}>
                                <ListItemIcon> <DraftsIcon /> </ListItemIcon>
                                <ListItemText primary="View / Edit Profile" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <ChangePasswordModal open={openCP} setOpen={setOpenCP} />
            {
                handleOpenEditProfile &&
                <ViewProfileModal handleOpenEdit={handleOpenEditProfile} />
            }
            <EditProfileModal open={openEditProfile} setOpen={setOpenEditProfile} />
        </>
    )
}
