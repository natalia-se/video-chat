import store from "../store";
import { setOnlineUsers } from "../reducers/chatSlice";

export const onlineUsersHandler = (socketId, usersData) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user) => {
        if (user.socketId === socketId) {
          user.myself = true;
        }
        return user;
      })
    )
  );
};
