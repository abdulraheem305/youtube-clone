import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AllSubscriptionIcon,
  GamingIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  KhuramloggerImage,
  LikeVideosIcon,
  MusicIcon,
  NewsIcon,
  PlaylistIcon,
  ReportHistoryIcon,
  SendFeedBackIcon,
  SettingIcon,
  ShortsIcon,
  SportsIcon,
  SubscriptionIcon,
  TahagoriImage,
  TrendingIcon,
  WatchLaterIcon,
  WSCubeImage,
  YoutubeKidsIcon,
  YoutubeMusicIcon,
  YoutubePremiumIcon,
} from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("home");
  const isOpen = isSidebarOpen;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/home" && location.pathname !== "/") {
      setActiveItem(null);
    } else {
      setActiveItem("home");
    }
  }, [location]);
  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "home") {
      navigate("/home");
    }
  };
  const getItemClass = (item) =>
    activeItem === item
      ? "text-gray-800 font-bold"
      : "text-gray-800 font-medium";

  if (!isOpen) return null;

  const menuSections = [
    {
      title: null,
      items: [
        { key: "home", label: "Home", icon: HomeIcon, path: "/home" },
        { key: "shorts", label: "Shorts", icon: ShortsIcon },
        {
          key: "subscriptions",
          label: "Subscriptions",
          icon: SubscriptionIcon,
        },
      ],
      divider: true,
    },
    {
      title: "You",
      items: [
        { key: "history", label: "History", icon: HistoryIcon },
        { key: "playlists", label: "Playlists", icon: PlaylistIcon },
        { key: "watchLater", label: "Watch Later", icon: WatchLaterIcon },
        { key: "likedVideos", label: "Liked videos", icon: LikeVideosIcon },
      ],
      divider: true,
    },
    {
      title: "Subscriptions",
      items: [
        { key: "talhaGhouri", label: "Talha Ghouri", icon: TahagoriImage },
        { key: "wsCubeTech", label: "WsCube Tech", icon: WSCubeImage },
        {
          key: "khurramVlogs",
          label: "Khurram Vlogs",
          icon: KhuramloggerImage,
        },
        {
          key: "allSubscriptions",
          label: "All subscriptions",
          icon: AllSubscriptionIcon,
        },
      ],
      divider: true,
    },
    {
      title: "Explore",
      items: [
        { key: "trending", label: "Trending", icon: TrendingIcon },
        { key: "music", label: "Music", icon: MusicIcon },
        { key: "gaming", label: "Gaming", icon: GamingIcon },
        { key: "news", label: "News", icon: NewsIcon },
        { key: "sports", label: "Sports", icon: SportsIcon },
      ],
      divider: true,
    },
    {
      title: "More from YouTube",
      items: [
        {
          key: "youtubePremium",
          label: "YouTube Premium",
          icon: YoutubePremiumIcon,
        },
        { key: "youtubeMusic", label: "YouTube Music", icon: YoutubeMusicIcon },
        { key: "youtubeKids", label: "YouTube Kids", icon: YoutubeKidsIcon },
      ],
      divider: true,
    },
    {
      title: null,
      items: [
        { key: "settings", label: "Settings", icon: SettingIcon },
        {
          key: "reportHistory",
          label: "Report History",
          icon: ReportHistoryIcon,
        },
        { key: "help", label: "Help", icon: HelpIcon },
        { key: "sendFeedback", label: "Send feedback", icon: SendFeedBackIcon },
      ],
      divider: true,
    },
  ];

  return (
    <div className="w-64 bg-white flex flex-col fixed top-16 left-0 right-0 bottom-0">
      <nav className="flex-1 overflow-y-auto scrollbar-thin">
        {menuSections.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h2 className="px-4 py-2 text-black font-semibold">
                {section.title}
              </h2>
            )}
            <ul>
              {section.items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center px-4 py-2 hover:rounded-lg hover:bg-gray cursor-pointer"
                  onClick={() => handleClick(item.key)}
                >
                  <span className="mr-4">{React.createElement(item.icon)}</span>
                  <span className={getItemClass(item.key)}>{item.label}</span>
                </li>
              ))}
            </ul>
            {index !== menuSections.length - 1 && (
              <hr className="my-2 border-gray" />
            )}
          </div>
        ))}
        <hr className="my-2 border-gray" />
        <footer className="px-4 py-4 text-gray-600 text-sm">
          <p>© 2024 Google LLC</p>
        </footer>
      </nav>
    </div>
  );
};

export default Sidebar;
