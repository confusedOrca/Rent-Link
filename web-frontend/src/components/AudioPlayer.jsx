import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ base64String, transcript }) => {
  const [script, setScript] = useState("");
  const [clicked, setIsClicked] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button
          onClick={() => {
            if (clicked) setScript("");
            else setScript(transcript);
            setIsClicked(!clicked);
          }}
        >
          <FontAwesomeIcon icon={faScroll} />
        </button>
        <audio controls src={`data:audio/webm;base64,${base64String}`} />
      </div>
      {script !== "" && <h3 className="text-2xl">Transcription: {script}</h3>}
    </div>
  );
};

export default AudioPlayer;
