import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/slice/videoSlice";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import crossIcon from "../../assets/crossIcon.png";
import { SearchIcon, VoiceIcon } from "../../constants";
import VoiceSearchModal from "../Modals/voiceSearchModal";

const InputSearch = ({ isVideoDetailPage }) => {
  const dispatch = useDispatch();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [searchQuery, setSearchQueryState] = useState("");
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  
  useEffect(() => {
    if (!listening && transcript.trim()) {
      handleUpdateSearch(transcript);
    }
  }, [transcript, listening]);

  const handleUpdateSearch = (query) => {
    setSearchQueryState(query);
    dispatch(setSearchQuery(query.trim()));
  };

  const handleSearchInput = (e) => {
    setSearchQueryState(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpdateSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQueryState("");
    dispatch(setSearchQuery(""));
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };
 
  const handleVoiceSearch = () => {
    resetTranscript();
    setShowVoiceModal(true);
    startListening();
  };

  const closeVoiceModal = () => {
    setShowVoiceModal(false);
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  return (
    <div className="group flex items-center my-1">
      <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#888888] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
        <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
          <SearchIcon className="text-black  text-xl" />
        </div>
        <input
          type="text"
          className="bg-transparent outline-none text-black  pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] relative"
          placeholder="Search"
          onChange={handleSearchInput}
          value={searchQuery}
          onKeyPress={handleKeyPress}
        />
        {searchQuery && (
          <button onClick={handleClearSearch}>
            <img
              src={crossIcon}
              alt="Clear"
              className="w-full h-full text-black object-contain"
            />
          </button>
        )}
      </div>
      <button
        className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#888888] rounded-r-3xl bg-white/[0.1] dark:bg-black/[0.1]"
        onClick={() => handleUpdateSearch(searchQuery)}
      >
        <SearchIcon className="text-black  text-xl" />
      </button>
      {!isVideoDetailPage && (
        <button
          className="ml-4 bg-lightGray hover:bg-gray p-3 rounded-full"
          onClick={handleVoiceSearch}
        >
          <VoiceIcon className="w-5 h-5 bg-darkGray" />
        </button>
      )}
      {showVoiceModal && (
        <VoiceSearchModal
          transcript={transcript}
          listening={listening}
          onClose={closeVoiceModal}
          onSearch={() => {
            SpeechRecognition.stopListening();
            handleUpdateSearch(transcript);
            closeVoiceModal();
          }}
        />
      )}
    </div>
  );
};

export default InputSearch;
