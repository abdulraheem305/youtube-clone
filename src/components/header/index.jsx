import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import React, { useState, useEffect } from "react";
import { BellIcon, CreateIcon, ToggleIcon, YoutubeIcon } from "../../constants";
import UserAvatarModal from "../Modals/UserAvatarModal";
import VoiceSearchModal from "../Modals/voiceSearchModal";
import InputSearch from "../inputSearch";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [searchQuery, setSearchQueryState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      setSearchQueryState(transcript);
    }
  }, [transcript, listening]);

  const closeVoiceModal = () => {
    setShowVoiceModal(false);
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  const handleNavigateHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-between bg-white fixed top-0 left-0 right-0 px-4 z-50">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="hover:bg-gray p-2 rounded-full"
        >
          <ToggleIcon className="w-6 h-6" />
        </button>
        <button onClick={handleNavigateHome}>
          <YoutubeIcon className="text-red-600 w-8 h-8" />
        </button>
      </div>

      <div className="flex justify-center items-center flex-1 mx-4">
        <InputSearch />
      </div>

      <div className="flex items-center space-x-4 relative z-50">
        <button className="flex items-center justify-center px-4 py-2 bg-lightGray text-gray-800 rounded-full hover:bg-gray">
          <CreateIcon className="w-4 h-4 mr-2" />
          <span className="font-semibold">Create</span>
        </button>
        <button className="text-gray-600 hover:bg-gray-200 p-2 rounded-full">
          <BellIcon className="w-6 h-6" />
        </button>
        <UserAvatarModal />
      </div>

      {showVoiceModal && (
        <VoiceSearchModal
          transcript={transcript}
          listening={listening}
          onClose={closeVoiceModal}
          onSearch={() => {
            SpeechRecognition.stopListening();
            setSearchQueryState(transcript);
            setShowVoiceModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;
