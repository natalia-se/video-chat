import React from "react";
import { useSelector } from "react-redux";

const VideoChatPage = () => {
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  console.log("users", onlineUsers);

  return (
    <>
      {/* Online users section */}
      {/* Create room buttton */}
      {/* Join room buttton */}
      <div>Video Chat Page</div>
    </>
  );
};

export default VideoChatPage;
