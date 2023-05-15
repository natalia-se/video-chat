import { v4 as uuid } from "uuid";
import store from "../store";
import { setInRoom, setRooms } from "../reducers/videoRoomSlice";
import * as socketConn from "../../socketConnection";
import {
  getAccessToLocalStream,
  getPeerId,
  disconnect,
} from "../../webRTCHandler";

export const createVideoRoom = async () => {
  // get access to local stream
  const success = await getAccessToLocalStream();

  if (success) {
    const newRoomId = uuid();

    store.dispatch(setInRoom(newRoomId));

    socketConn.createVideoRoom({
      peerId: getPeerId(),
      newRoomId,
    });
  }
};

export const joinVideoRoom = async (roomId) => {
  // get access to local stream
  const success = await getAccessToLocalStream();

  if (success) {
    store.dispatch(setInRoom(roomId));

    socketConn.joinVideoRoom({
      roomId,
      peerId: getPeerId(),
    });
  }
};

export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};

export const leaveVideoRoom = (roomId) => {
  disconnect();
  socketConn.leaveVideoRoom({
    roomId,
  });

  store.dispatch(setInRoom(false));
};
