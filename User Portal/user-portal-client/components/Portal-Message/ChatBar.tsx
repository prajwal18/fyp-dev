import React, { useEffect, useMemo } from 'react';
import {
    Box, Stack, Typography
} from '@mui/material';
import styled from 'styled-components';
// MUI icons
import SendIcon from '@mui/icons-material/Send';
// MUI icons
import ProfileImage from '../Common/components/ProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '@/utils/endpoints';
import { selectOnlineUsers, updateConversation, updateReceiver } from '@/redux/message/message.slice';

// Styled Components
const UserProfileContainer = styled(Stack)`
    padding: 10px; border-radius: 5px;
    background-color: ${(props: any) => props.selected ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)'};
    color: ${(props: any) => props.selected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'};
    align-items: center; width: 100%; cursor: pointer;
    &:hover { background-color: rgba(0,0,0,0.8); color: rgba(255,255,255,0.7) }
    &:active { background-color: rgba(0,0,0, 1); color: rgba(255,255,255, 1) }
`;
// Styled Components


const ChatBarHeader = () => {
    return (
        <>
            <Stack direction='row' spacing={2} sx={{
                background: "rgba(0,0,0,0.8)",
                color: "white",
                padding: "20px",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant='h4' component='h1'>Direct Message</Typography>
                <SendIcon sx={{ fontSize: "35px" }} />
            </Stack>
        </>
    );
}

const UserProfile = ({ user, currentReceiverId, active }: { user: any, currentReceiverId: string, active: boolean }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(updateConversation({}));
        dispatch(updateReceiver(user));
    }
    return (
        <UserProfileContainer
            direction='row'
            spacing={2}
            selected={user?._id === currentReceiverId}
            onClick={handleClick}
        >
            <ProfileImage
                src={baseURL + (user?.profilePicture || '/abc.jpg')}
            />

            <Typography sx={{ fontSize: "20px", color: active ? 'rgb(0, 165, 56)' : 'white' }}>{user?.name}</Typography>
        </UserProfileContainer>
    );
}

const ChatBar = ({ users, receiver }: { users: Array<any>, receiver: any }) => {
    const onlineUsers = useSelector(selectOnlineUsers);
    return (
        <Stack sx={{ width: "30%", borderRight: "2px solid grey" }}>
            <ChatBarHeader />
            <Stack spacing={2}
                sx={{
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "20px",
                    alignItems: "center",
                    height: "100%",
                    minHeight: "500px",
                    overflow: "auto",
                }}
                className='hideScrollBar'
            >
                {
                    users?.length && users.map((user: any) => {
                        return (
                            <React.Fragment key={user._id}>
                                <UserProfile
                                    user={user} currentReceiverId={receiver?._id || ''}
                                    active={onlineUsers?.find((onlineUser: any) => onlineUser.userId === user._id) ? true : false}
                                />
                            </React.Fragment>
                        )
                    })
                }
            </Stack>
        </Stack>
    )
}

export default ChatBar