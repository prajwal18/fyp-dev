import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/general/general.slice';
import { baseURL } from "@/utils/endpoints";
import ChatPage from './ChatPage';

// Socket io to establish two way communication between server and client
import * as io from 'socket.io-client';
import { selectReceiver, selectUsers, updateOnlineUsers, updateReceiver } from '@/redux/message/message.slice';
import { fetchConversationAC } from '@/redux/message/actions';
const socket = io.connect(baseURL);
// Socket io to establish two way communication between server and client

const MessagePage = () => {
    const user = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const receiver = useSelector(selectReceiver);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user?._id && socket?.id) {
            socket.emit('newUser', { userId: user._id, socketId: socket.id })
        }
    }, [socket, user]);

    useEffect(() => {
        socket.on('newUserResponse', (data) => dispatch(updateOnlineUsers(data)));
        socket.on('messageSent', (data) => {
            console.log(receiver?._id, data.senderId)
            if (receiver?._id && receiver._id === data.senderId) {
                dispatch(fetchConversationAC({id: data.conversationId}))
            } else {
                if (users?.length && users.find((user: any) => user._id === data.senderId)) {
                    const user = users.find((user: any) => user._id === data.senderId);
                    dispatch(updateReceiver(user))
                }
            }
        })
    }, [socket, users, dispatch, receiver]);

    return (
        <ChatPage socket={socket} />
    )
}

export default MessagePage