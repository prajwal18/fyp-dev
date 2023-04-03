import { createSlice } from '@reduxjs/toolkit';

// Initial state for message slice
import { MessageIS, MessageIST } from '@/constants/InitialReduxStates';
import { ActionT } from '@/constants/CustomTypes';
// Initial state for message slice

// Creating the message slice
const options = {
    name: 'message',
    initialState: MessageIS,
    reducers: {
        updateUsers: (state: MessageIST, action: ActionT) => {
            return { ...state, users: action.payload }
        },
        updateOnlineUsers: (state: MessageIST, action: ActionT) => {
            return { ...state, onlineUsers: action.payload }
        },
        updateReceiver: (state: MessageIST, action: ActionT) => {
            return { ...state, receiver: action.payload }
        },
        updateConversation: (state: MessageIST, action: ActionT) => {
            return { ...state, conversation: action.payload }
        },
        resetState: (state: MessageIST, action: ActionT) => {
            return MessageIS
        }
    }
}
// Creating the slice
export const messageSlice = createSlice(options);
// Creating the message slice

// Selector functions
export const selectUsers = (state: any) => {
    return state.message.users;
}
export const selectOnlineUsers = (state: any) => {
    return state.message.onlineUsers
}
export const selectReceiver = (state: any) => {
    return state.message.receiver;
}
export const selectConversation = (state: any) => {
    return state.message.conversation;
}
// Selector functions


// Exporting the action creator functions
export const { updateUsers, updateReceiver, updateConversation, resetState, updateOnlineUsers } = messageSlice.actions;
// Exporting the action creator functions

// Exporting the reducer as the default export
export default messageSlice.reducer;
// Exporting the reducer as the default export