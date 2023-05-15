import React from "react";
import { useSelector } from "react-redux";
import Video from "../components/Video";
import VideoRoomButtons from "../components/VideoRoomButtons";

const InCallPage = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const localStream = useSelector((state) => state.videoRooms.localStream);
  const remoteStream = useSelector((state) => state.videoRooms.remoteStream);
  return (
    <div className="w-full h-screen bg-top bg-cover bg-blue-950">
      <div className="flex flex-col items-centers md:flex-row">
        <VideoRoomButtons inRoom={inRoom} />
        {localStream && <Video stream={localStream} muted />}
        {remoteStream && <Video stream={remoteStream} muted />}
      </div>
    </div>
  );
};

export default InCallPage;
