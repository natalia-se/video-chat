import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bg from "../images/bg-image.jpg";
import clsx from "clsx";
import { connectWithSocketIOServer, login } from "../socketConnection";

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username });
    navigate("/videochat");
  };

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{
              backgroundImage: `url(${Bg})`,
              backgroundPosition: "center center",
            }}
          ></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">
              Welcome to our Video Chat
            </h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Enter your name
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-6 text-center">
                <button
                  className={clsx(
                    "w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline",
                    isUsernameValid(username) &&
                      "bg-cyan-400 hover:bg-cyan-700",
                    !isUsernameValid(username) && "bg-gray-500"
                  )}
                  type="button"
                  onClick={handleLogin}
                  disabled={!isUsernameValid(username)}
                >
                  Go to video chat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
