import React from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomButton = () => {
  const navigate = useNavigate();

  const handleRoomCreate = () => {
    // check if you are in the room
    // create video room
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
