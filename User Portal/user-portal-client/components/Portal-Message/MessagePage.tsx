import React from 'react';
import ChatPage from './ChatPage';
import { baseURL } from "@/utils/endpoints";

// Socket io to establish two way communication between server and client
import * as io from 'socket.io-client';
const socket = io.connect(baseURL);
// Socket io to establish two way communication between server and client

const MessagePage = () => {
    return (
        <ChatPage />
    )
}

export default MessagePage