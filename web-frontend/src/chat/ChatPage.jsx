import { useLocation, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import VoiceRecorder from "../components/VoiceRecorder";
import AudioPlayer from "../components/AudioPlayer";

const ChatPage = () => {
  const { auth } = useAuth();
  const { chatterId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatID, setChatID] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isSendingText, setIsSendingText] = useState(false);
  const [status, setStatus] = useState("");

  const fetchData = async () => {
    var anyUpdate = false;
    const fresult = await axiosPrivate.post("/getchat", {
      chatterId: chatterId,
    });
    setChatID(fresult.data._id);
    if (fresult.data.messages.length > messages.length) {
      setIsSendingText(false);
      anyUpdate = true;
    }
    if (anyUpdate) {
      setMessages(fresult.data.messages);
    }
    if (anyUpdate) updateScroll();
  };

  var element = document.getElementById("chatwindow");

  function updateScroll() {
    if (!element) return;
    var scrollTop = element.scrollTop;
    var scrollHeight = element.scrollHeight;
    var clientHeight = element.clientHeight;
    var scrollBottom = scrollHeight - scrollTop - clientHeight;

    // Check if scrolled above bottom 25%
    if (scrollBottom > 5) {
      return;
    }

    element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    if (element && messages.length > 0 && !loaded) {
      setLoaded(true);
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    fetchData();

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    setIsSendingText(true);
    const text = input;
    setInput("");
    await axiosPrivate.post("/addMessage", {
      chatId: chatID,
      text: text,
      isAudio: false,
      transcription: "",
    });
    element.scrollTop = element.scrollHeight;
  };

  return (
    <>
      <div className="mx-auto max-w-[120rem] mb-4">
        {isSendingText && <h3 className="ml-auto">Sending text...</h3>}
        {status === "" && !isSendingText ? (
          <h3 className="ml-auto">Chat Box</h3>
        ) : (
          <h3>{status}</h3>
        )}
      </div>

      <div className="h-screen flex flex-col p-[2rem] bg-gray-100 max-w-[120rem] mx-auto max-h-[60vh]">
        <div id="chatwindow" className="flex-1 p-4 overflow-y-auto">
          {/* Chat messages */}
          <div className="flex flex-col space-y-4">
            {messages.map((message) => {
              if (!message.isAudio) {
                if (message.sender === auth.userId)
                  return (
                    <div key={message._id} className="flex items-end justify-end">
                      <div className="rounded-lg max-w-[40%] bg-gray-200 py-2 px-8">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  );
                else
                  return (
                    <div key={message._id} className="flex items-start">
                      <div className="rounded-lg max-w-[40%] bg-blue-500 py-2 px-8 text-white">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  );
              } else {
                if (message.sender === auth.userId) {
                  return (
                    <div key={message._id} className="flex items-end justify-end">
                      <AudioPlayer base64String={message.text} transcript={message.transcription} />
                    </div>
                  );
                } else {
                  return (
                    <div className="flex items-start">
                      <AudioPlayer base64String={message.text} transcript={message.transcription} />
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
        <div className="p-4">
          {/* Chat input */}
          <div className="flex items-center">
            <textarea
              id="text"
              wrap="hard"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md p-2 mr-8"
            />
            <VoiceRecorder chatID={chatID} />

            <button
              onClick={handleSubmit}
              className="bg-blue-500 ml-5 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
