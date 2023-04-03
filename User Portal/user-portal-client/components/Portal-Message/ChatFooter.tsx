import React, { useState } from 'react';
import {
  Box, Stack, TextField, Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { apiCallNResp } from '@/utils/apiCallNResp';
import { httpUpdateConversation } from '@/service/conversation.service';
import { fetchConversationAC } from '@/redux/message/actions';

const CustomTextField = ({ value, onChange }: { value: string, onChange: (value: any) => void }) => {
  return (
    <Box sx={{ borderRadius: "5px", overflow: "hidden", width: "100%" }}>
      <TextField
        placeholder='Type something...'
        fullWidth
        value={value}
        onChange={onChange}
        type="text"
        sx={{
          background: "rgba(255,255,255,0.5)"
        }}
      />
    </Box>
  )
}

const ChatFooter = ({ conversationId, receiverId, user, socket }: { conversationId: string, receiverId: string, user: any, socket: any }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    setText(e.target.value);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (text !== '') {
      const data = { user: user._id, message: text };
      const response = await apiCallNResp(() => httpUpdateConversation(data, conversationId));
      if (response?.success) {
        setText('');
        dispatch(fetchConversationAC({ id: response.data._id }));
        socket.emit('message', { senderId: user._id, receiverId, conversationId })
      }
    }
  }
  return (
    <Stack
      component='form'
      direction='row'
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ background: "rgba(0,0,0,0.8)", padding: "10px", borderRadius: "5px" }}
    >
      <CustomTextField
        value={text}
        onChange={handleChange}
      />
      <Button color="warning" variant='contained'>Send</Button>
    </Stack>
  )
}

export default ChatFooter;