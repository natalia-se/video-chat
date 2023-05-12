import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    removeDisconnectedUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (onlineUser) => onlineUser.socketId !== action.payload
      );
    },
  },
});

export const { setOnlineUsers, removeDisconnectedUser } = chatSlice.actions;

export default chatSlice.reducer;
