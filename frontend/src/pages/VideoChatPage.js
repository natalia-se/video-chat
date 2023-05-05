import React from "react";
import { useSelector } from "react-redux";
import Bg from "../images/bg-image.jpg";

const VideoChatPage = () => {
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  console.log("users", onlineUsers);

  return (
    <div
      style={{ "--image-url": `url(${Bg})` }}
      className="w-full h-screen bg-top bg-cover bg-[image:var(--image-url)]"
    >
      <div className="flex flex-col justify-center items-centers md:flex-row md:justify-between">
        <div className="w-80 m-3">
          <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Online users
              </h3>
            </div>
            {onlineUsers.map((onlineUser) => {
              return (
                <div key={onlineUser.socketId} className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_1280.jpg"
                            alt="Avatar"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {onlineUser.username}
                          </p>
                        </div>
                        {/* {convertRoomsToArray(rooms).find(room => room.socketId === onlineUser.socketId) } */}
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        {/* Create room buttton */}
        {/* Join room buttton */}
        <div>Video Chat Page</div>
      </div>
    </div>
  );
};

export default VideoChatPage;
