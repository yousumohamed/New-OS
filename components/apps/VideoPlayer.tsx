import React from 'react';

interface VideoPlayerProps {
  windowId: string;
  data?: { videoUrl?: string };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ data }) => {
  const videoUrl = data?.videoUrl;

  return (
    <div className="w-full h-full flex justify-center items-center bg-black">
      {videoUrl ? (
        <video
          className="max-w-full max-h-full"
          src={videoUrl}
          controls
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-white">
          <p>No video file selected.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
