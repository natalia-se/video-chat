import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VideoChatPage from "./pages/VideoChatPage";
import InCallPage from "./pages/InCallPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/videochat" element={<VideoChatPage />} />
      <Route path="/call" element={<InCallPage />} />
    </Routes>
  );
};

export default App;
