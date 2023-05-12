import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createVideoRoom } from "../app/actions/videoRoomActions";

const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const navigate = useNavigate();

  const handleRoomCreate = () => {
    if (inRoom) {
      return alert("You are already in the room");
    }

    createVideoRoom();
    navigate("/call");
  };

  return (
    <div className="m-6">
      <button
        className="w-54 px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline bg-cyan-400 hover:bg-cyan-700"
        type="button"
        onClick={handleRoomCreate}
      >
        Create video chat
      </button>
    </div>
  );
};

export default CreateRoomButton;
