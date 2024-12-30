import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectVideos } from "../../redux/slice/videoSlice";
import { useNavigate } from "react-router-dom";

const YouTubeBody = () => {
  const videos = useSelector(selectVideos);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {videos.length === 0 ? (
        <div className="w-full text-center">Video not found</div>
      ) : (
        videos.map((video, index) => (
          <div
            key={index}
            className="cursor-pointer w-full p-2"
            onClick={() => navigate(`/video/${video.id}`)}
          >
            <div
              className="relative w-full h-48 bg-black rounded-[10px] overflow-hidden group"
              onClick={() => navigate(`/video/${video.id}`)}
            >
              {loading ? (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="loader border-t-4 border-b-4 border-red-500 rounded-full w-12 h-12 animate-spin"></div>
                </div>
              ) : (
                <div className="absolute top-0 left-0 w-full h-full">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    className="w-full h-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center space-x-3">
              <img
                src={video.channelLogo}
                alt={video.channelName}
                className="w-9 h-9 rounded-full -mt-4"
              />
              <div>
                <h3 className="text-sm font-bold">{video.title}</h3>
                <p className="text-xs text-gray-500">{video.channelName}</p>
                <p className="text-xs text-gray-400">
                  {video.views} views • {video.publishedDate}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YouTubeBody;
