import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const Searchbox = (props) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getSearch(
      search.replaceAll(" ", "+").replaceAll(",", "+").replaceAll(".", "+")
    );
  };

  function speakText(text, callback) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      if (callback) {
        callback();
      }
    };

    synth.speak(utterance);
  }

  function transcribeSpeechToText(
    inputFieldId,
    isNumber,
    isBangla,
    setter,
    callback
  ) {
    const inputField = document.getElementById(inputFieldId);
    const speakText = document.getElementById("speakText");
    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = isBangla ? "bn-BD" : "en-US";

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript;

      if (isNumber) {
        if (!isNaN(transcript)) {
          transcript = parseInt(transcript);
        }
      }

      if (inputFieldId === "address") {
        const field = document.getElementById(inputFieldId);
        field.placeholder = transcript;
        field.classList.add("placeholder-black");
      }
      setter(transcript);

      speakText.innerHTML = "";

      if (callback) {
        callback(transcript);
      }
    };

    recognition.start();
    speakText.innerHTML = "Speak";
  }

  function getAddress(isBangla) {
    const q = isBangla
      ? "koothaay baashaa khujtesen?"
      : "Where are you looking for rent?";
    speakText(q, () => {
      transcribeSpeechToText("search", false, isBangla, setSearch, () => {});
    });
  }

  return (
    <form
      className="flex flex-col justify-around text-2xl font-mono w-[80%] mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-around h-[fit]">
        <input
          id="search"
          type="text"
          placeholder="Search a place..."
          className="border-[1px] px-8 rounded-lg min-w-[80%]"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faMicrophone}
            onClick={() => {
              getAddress(false);
            }}
          />
        </button>

        <button
          type="submit"
          className="text-white text-xl rounded-lg p-4 bg-slate-600 w-[10rem]"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Searchbox;
