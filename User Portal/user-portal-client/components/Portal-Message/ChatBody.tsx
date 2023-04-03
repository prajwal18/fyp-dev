import React from 'react';
import {
    Stack, Typography, Box
} from '@mui/material';
import ChatFooter from './ChatFooter';

const SenderMsg = ({ text, name }: { text: string, name: string }) => {
    return (
        <Stack direction='row' justifyContent='flex-end'
        >
            <Box>
                <Typography
                    sx={{
                        backgroundColor: "rgb(0, 117, 219)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "50px",
                        marginLeft: "200px"
                    }}
                >
                    {text}
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.5)", textAlign: "right", mt: 1, mr: 1 }}>{name}</Typography>
            </Box>
        </Stack>
    )
}

const ReceiverMsg = ({ text, name }: { text: string, name: string }) => {
    return (
        <Stack direction='row' justifyContent='flex-start'
        >
            <Box>
                <Typography
                    sx={{
                        backgroundColor: "rgb(0, 165, 56)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "50px",
                        marginRight: "200px"
                    }}
                >
                    {text}
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.5)", textAlign: "left", mt: 1, ml: 1 }}>{name}</Typography>
            </Box>
        </Stack>
    )
}

const ChatBody = ({ user, receiver, conversation, lastMessageRef, socket }: { user: any, receiver: any, conversation: any, lastMessageRef:any, socket: any }) => {
    return (
        <Stack spacing={1} sx={{ width: "70%", background: "rgba(0,0,0,0.7)", padding: "20px" }}>
            {
                user?._id && receiver?._id && conversation?._id &&
                <>
                    <Typography mb={1} sx={{ color: "white" }}>{receiver.name}</Typography>
                    <Stack
                        spacing={1}
                        sx={{
                            background: "rgba(0,0,0,0.8)",
                            padding: "20px", borderRadius: "5px",
                            flexGrow: "1", overflow: "auto"
                        }}
                        className='hideScrollBar'
                    >
                        {
                            conversation?.conversation?.length && conversation.conversation.map((message: any, index: number) => (
                                <React.Fragment key={index}>
                                    {
                                        message.user === user._id ?
                                            <SenderMsg text={message.message} name={user.name} />
                                            :
                                            message.user === receiver._id ? // I know this may be redundant, but just in case... 
                                                <ReceiverMsg text={message.message} name={receiver.name} />
                                                :
                                                <></>
                                    }
                                </React.Fragment>
                            ))
                        }
                        <div ref={lastMessageRef}></div>
                    </Stack>
                    <ChatFooter
                        conversationId={conversation._id}
                        receiverId={receiver._id}
                        user={user}
                        socket={socket}
                    />
                </>
            }
        </Stack>
    )
}

export default ChatBody;