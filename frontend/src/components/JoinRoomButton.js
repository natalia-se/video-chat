import React from "react";
import { useNavigate } from "react-router-dom";
import { joinVideoRoom } from "../app/actions/videoRoomActions";

const RoomJoinButton = ({ creatorUsername, roomId }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    joinVideoRoom(roomId);
    navigate("/call");
  };

  return (
    <div className="m-6">
      <button
        className="w-54 px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline bg-cyan-400 hover:bg-cyan-700"
        type="button"
        onClick={handleJoinRoom}
      >
        {`Join video chat with ${creatorUsername}`}
      </button>
    </div>
  );
};

export default RoomJoinButton;
