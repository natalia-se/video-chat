import React, { useRef, useEffect } from "react";

const Video = ({ stream, muted }) => {
  const videoEl = useRef();

  useEffect(() => {
    const video = videoEl.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className="w-full m-2 md:w-1/2">
      <video
        ref={videoEl}
        width="98%"
        height="98%"
        playsInline
        autoPlay
        muted={muted}
      />
    </div>
  );
};

export default Video;
