import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const VoiceRecorder = ({ chatID }) => {
  const axiosPrivate = useAxiosPrivate();
  const [audio, setAudio] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    recognitionRef.current = new webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.onresult = handleRecognitionResult;
  }, []);

  const handleRecognitionResult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setTranscribedText(transcript);
    console.log("here2");
  };

  useEffect(() => {
    const sendMessage = async () => {
      await sendAudioMessage(audio);
    };
    if (audio !== "" && transcribedText !== "") {
      sendMessage();
    }
    setAudio("");
    setTranscribedText("");
  }, [transcribedText]);

  const startRecording = () => {
    setIsRecording(true);
    setAudio(""); // Reset audio state
    setTranscribedText(""); // Reset transcribedText state
    chunksRef.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64String = reader.result.split(",")[1];
            setAudio(base64String); // Set audio state
            console.log("here1");
          };
          reader.readAsDataURL(blob);
        };
        mediaRecorderRef.current.start();
        recognitionRef.current.start();
      })
      .catch((err) => console.error("Error accessing microphone:", err));
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    recognitionRef.current.stop();
  };

  const sendAudioMessage = async (base64String) => {
    try {
      console.log(transcribedText);
      await axiosPrivate.post("/addMessage", {
        chatId: chatID,
        text: base64String,
        isAudio: true,
        transcription: transcribedText,
      });
    } catch (error) {
      console.error("Error sending audio message:", error);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
      </button>
      {audio && (
        <div>
          <h3>Recorded Audio:</h3>
          <audio controls src={`data:audio/webm;base64,${audio}`} />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
