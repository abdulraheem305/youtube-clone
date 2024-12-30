import { useEffect, useRef, useState } from "react";
import debounce from "../../utils/debounce";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ModalIcon } from "../../constants";

const VoiceSearchModal = ({ onClose, onSearch }) => {
  const modalRef = useRef(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [displayText, setDisplayText] = useState("Listening...");

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    return () => {
      SpeechRecognition.stopListening();
      resetTranscript();
    };
  }, [resetTranscript]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (transcript.trim()) {
      setDisplayText(transcript);
      const debouncedSearch = debounce(() => {
        onSearch(transcript);
      }, 2000);
      debouncedSearch();
    }
  }, [transcript, onSearch]);

  const handleClose = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setDisplayText("");
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray bg-opacity-60">
      <div
        ref={modalRef}
        className="bg-white shadow-lg w-[570px] h-[450px] flex flex-col items-center justify-center relative"
        style={{ top: "-230px", right: "25px" }}
      >
        <button
          className="absolute top-4 right-4 text-black"
          onClick={handleClose}
        >
          <span className="text-xl font-bold">&times;</span>
        </button>
        <textarea
          rows="8"
          className="w-[90%] p-6 rounded-md resize-none"
          value={displayText}
          readOnly
        />
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray mt-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-3">
            <ModalIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSearchModal;
