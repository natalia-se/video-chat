import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatSlice";
import videoRoomsReducer from "./reducers/videoRoomSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    videoRooms: videoRoomsReducer,
  },
});

export default store;
