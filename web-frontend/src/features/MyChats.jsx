import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const MyChats = () => {
  const axiosPrivate = useAxiosPrivate();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axiosPrivate.get("/getchats");
        setChats(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="cardsBox overflow-x-auto flex space-x-8 py-2 text-[1.2rem]">
      {chats.map((chat) => {
        var chatter = null;
        if (!chat.users[0] || !chat.users[1]) return;
        if (chat.users[0]._id === auth.userId) chatter = chat.users[1];
        if (chat.users[1]._id === auth.userId) chatter = chat.users[0];

        return (
          <button
            onClick={() => {
              navigate(`/profile/chat/${chatter._id}`);
            }}
            key={chat._id}
            className="text-white text-2xl font-light bg-slate-600 rounded-xl"
          >
            <h1 className="px-[8rem] py-5">Click to continue chat with:</h1>
            <div className="flex bg-slate-500 justify-center py-16 text-3xl">
              <h3>{"User: " + chatter.firstname + " " + chatter.lastname}</h3>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MyChats;
