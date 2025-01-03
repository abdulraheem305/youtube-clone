import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectVideos, selectSearchQuery } from "../redux/slice/videoSlice";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videos = useSelector(selectVideos);
  const searchQuery = useSelector(selectSearchQuery);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  console.log(isSidebarActive)

  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery.trim()) {
      setFilteredVideos(filtered.slice(0, 4));
      setSelectedVideo(
        filtered.find((video) => video.id === id) || filtered[0] || null
      );
    } else {
      setFilteredVideos(videos.slice(0, 4));
      const initialVideo = videos.find((video) => video.id === id);
      setSelectedVideo(initialVideo || null);
    }
  }, [searchQuery, id, videos]);

  const toggleSidebar = () => setIsSidebarActive((prev) => !prev); 

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        {isSidebarActive && (
          <div className="w-64 bg-black">
            <Sidebar isSidebarOpen={isSidebarActive} />
          </div>
        )}
        <div className={`flex-grow py-20 ${isSidebarActive ? "ml-6" : ""}`}>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-2/3 text-black">
              {selectedVideo ? (
                <>
                  <iframe
                    className="aspect-video w-full max-w-6xl rounded-md px-4 py-2 sm:mx-0"

                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-4">
                    <h1 className="text-2xl px-4 font-bold">
                      {selectedVideo.title}
                    </h1>
                    <p className="text-sm px-4 text-gray-400">
                      {selectedVideo.channelName}
                    </p>
                    <p className="text-sm px-4 text-gray-500">
                      {selectedVideo.views} views •{" "}
                      {selectedVideo.publishedDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-end space-x-4 mt-4 px-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">👍</span>
                      <span className="text-sm">28K</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">👎</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">🔗</span>
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">⬇️</span>
                      <span className="text-sm">Download</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">✂️</span>
                      <span className="text-sm">Clip</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-lightGray rounded-full hover:bg-gray">
                      <span className="text-xl">🔖</span>
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center mt-20 text-gray-500">
                  {searchQuery
                    ? "No matching videos found."
                    : "Please select a video to play."}
                </div>
              )}
            </div>

            {selectedVideo && (
              <div className="hidden sm:block w-1/3 ml-8">
                <h2 className="text-xl px-4 font-bold">Other Videos</h2>
                <div className="space-y-4 mt-4">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => navigate(`/video/${video.id}`)}
                    >
                      <div>
                        <iframe
                          src={video.videoUrl}
                          title={video.title}
                          className="w-24 h-20 sm:w-32 sm:h-28 md:w-48 md:h-36 object-cover pointer-events-none rounded-md"

                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">{video.title}</p>
                        <p className="text-xs text-gray-400">
                          {video.channelName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {video.views} views • {video.publishedDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
