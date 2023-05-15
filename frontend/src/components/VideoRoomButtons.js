import React from "react";
import { useNavigate } from "react-router-dom";
import { BsTelephoneX, BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { leaveVideoRoom } from "../app/actions/videoRoomActions";
import { useSelector, useDispatch } from "react-redux";
import { setIsMicOn, setIsCameraOn } from "../app/reducers/videoRoomSlice";
import clsx from "clsx";

const VideoRoomButtons = ({ inRoom }) => {
  const isMicOn = useSelector((state) => state.videoRooms.isMicOn);
  const isCameraOn = useSelector((state) => state.videoRooms.isCameraOn);
  const localStream = useSelector((state) => state.videoRooms.localStream);
  const iconSize = 25;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    leaveVideoRoom(inRoom);
    navigate("/videochat");
  };

  const handleMuteUnmuteChange = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setIsMicOn(!isMicOn));
  };

  const handleCameraOnOffChange = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setIsCameraOn(!isCameraOn));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-16">
      <div className="flex items-centers justify-center">
        <button
          className={clsx(
            "rounded-full p-2 my-auto mx-2 min-w-[3rem] min-h-[3rem]",
            "flex flex-row justify-center items-center",
            isMicOn && "bg-cyan-600 hover:bg-cyan-400",
            !isMicOn && "bg-red-600 hover:bg-red-500"
          )}
          onClick={handleMuteUnmuteChange}
        >
          {isMicOn && <BiMicrophone size={iconSize} />}
          {!isMicOn && <BiMicrophoneOff size={iconSize} />}
        </button>
        <button
          className={clsx(
            "rounded-full p-2 my-auto mx-2 min-w-[3rem] min-h-[3rem]",
            "flex flex-row justify-center items-center",
            "bg-cyan-600 hover:bg-cyan-400"
          )}
          onClick={handleLeaveRoom}
        >
          <BsTelephoneX size={iconSize} />
        </button>
        <button
          className={clsx(
            "rounded-full p-2 my-auto mx-2 min-w-[3rem] min-h-[3rem]",
            "flex flex-row justify-center items-center",
            isCameraOn && "bg-cyan-600 hover:bg-cyan-400",
            !isCameraOn && "bg-red-600 hover:bg-red-500"
          )}
          onClick={handleCameraOnOffChange}
        >
          {isCameraOn && <BsCameraVideo size={iconSize} />}
          {!isCameraOn && <BsCameraVideoOff size={iconSize} />}
        </button>
      </div>
    </div>
  );
};

export default VideoRoomButtons;
