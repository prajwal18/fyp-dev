import React, { useEffect, useRef } from 'react';
import {
  Box, Stack
} from '@mui/material';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import { useDispatch, useSelector } from 'react-redux';
import { selectConversation, selectReceiver, selectUsers } from '@/redux/message/message.slice';
import { selectCourses, selectUser } from '@/redux/general/general.slice';
import { fetchAllCourseMembersAC, fetchConversationAC } from '@/redux/message/actions';
import { httpCheckConversationExists } from '@/service/conversation.service';
import { toast } from 'react-toastify';
import { httpCreateConversation } from '@/service/conversation.service';

const ChatPage = ({ socket }: { socket: any }) => {
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const receiver = useSelector(selectReceiver);
  const courses = useSelector(selectCourses);
  const conversation = useSelector(selectConversation);
  const lastMessageRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id && receiver?._id) {
      const ids = `${user._id},${receiver._id}`;
      httpCheckConversationExists(ids)
        .then(response => response.data)
        .then(response => {
          if (response.success) {
            dispatch(fetchConversationAC({ id: response.data }));
          } else {
            httpCreateConversation(ids)
              .then(response => response.data)
              .then(response => {
                if (response.success) {
                  dispatch(fetchConversationAC({ id: response.data._id }));
                } else {
                  toast.error(response.message);
                }
              })
              .catch(error => { toast.error(error.message) })
          }
        })
        .catch(error => {
          toast.error(error.message);
        })
    }
  }, [dispatch, receiver, user]);

  useEffect(() => {
    if (courses?.length) {
      dispatch(fetchAllCourseMembersAC());
    }
  }, [dispatch, courses]);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "white" }}>
      <Stack
        direction='row'
        sx={{ border: '1px solid grey', maxHeight: "90vh" }}
      >
        <ChatBar
          users={users || []}
          receiver={receiver}
        />
        <ChatBody
          user={user}
          receiver={receiver}
          conversation={conversation}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
      </Stack>
    </Box >
  )
}

export default ChatPage;