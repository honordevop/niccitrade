"use client";
import { useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import { MdCloseFullscreen } from "react-icons/md";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const element = document.documentElement; // This makes the whole page fullscreen

    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="text-lg border border-blue-950 rounded-md text-blue-950 flex items-center justify-center">
      <button onClick={toggleFullscreen} className="p-1">
        {isFullscreen ? (
          <MdCloseFullscreen title="Close FullScreen" />
        ) : (
          <BsArrowsFullscreen title="FullScreen" />
        )}
      </button>
    </div>
  );
}
