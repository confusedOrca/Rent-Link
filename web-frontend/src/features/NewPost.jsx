import ImageUploader from "../components/ImageUploader";
import AddressPicker from "./AddressPicker";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toWords } from "number-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const NewPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [img, setImg] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [rent, setRent] = useState(0);
  const [size, setSize] = useState(0);
  const [descrp, setDescrp] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [bangla, setBangla] = useState(false);

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

  function transcribeSpeechToText(inputFieldId, isNumber, isBangla, setter, callback) {
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
    const q = isBangla ? "Aapnar baaasha koothaay?" : "What is your address?";
    speakText(q, () => {
      transcribeSpeechToText("address", false, isBangla, setLocationName, () => {
        getRent(isBangla);
      });
    });
  }

  function getRent(isBangla) {
    const q = isBangla ? "Aapnar bhaara koto?" : "What is your rent?";
    speakText(q, () => {
      transcribeSpeechToText("rent", true, isBangla, setRent, () => {
        getSize(isBangla);
      });
    });
  }

  function getSize(isBangla) {
    const q = isBangla ? "Aapnar baaasha kotto boro?" : "What is the size of your property?";
    speakText(q, () => {
      transcribeSpeechToText("size", true, isBangla, setSize, () => {
        getDescription(isBangla);
      });
    });
  }

  function getDescription(isBangla) {
    const q = isBangla ? "Apnar baaasha shomporke kichchu boolun" : "Describe your property";
    speakText(q, () => {
      transcribeSpeechToText("message", false, isBangla, setDescrp, () => {
        const speakText = document.getElementById("speakText");
        speakText.innerHTML = "";
      });
    });
  }

  useEffect(() => {
    if (img.length === 0) setImages([]);
    const files = document.getElementById("newPostFile").files;
    Object.keys(files).forEach((key) => {
      setImages((current) => [...current, [files.item(key).name, files.item(key)]]);
    });
  }, [img]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const sendFiles = async () => {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append(`pic${i}`, images[i][1]);
      }

      formData.append("userId", auth.userId);
      formData.append("email", auth.email);
      formData.append("locationName", locationName);
      formData.append("rent", rent);
      formData.append("size", size);
      formData.append("descrp", descrp);
      formData.append("lat", locationCoordinates.latitude);
      formData.append("long", locationCoordinates.longitude);

      for (const pair of formData.entries()) {
        console.log(pair);
      }

      try {
        const result = await axiosPrivate.post("/post", formData, {
          headers: { "Content-Type": `multipart/form-data` },
        });
        navigate("/profile");
      } catch (error) {
        if (!error?.response) {
          setError("No Server Response");
        } else if (error.response?.status === 400) {
          setError("Incomplete fields");
        } else {
          setError("Login failed");
        }
      }
    };
    sendFiles();
  };
  const handleLocationChange = (location, coordinates) => {
    setLocationName(location);
    setLocationCoordinates(coordinates);
  };
  const imageHandler = (images) => {
    setImg(images);
  };
  const rentChangeHandler = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
    setRent(e.target.value);
  };
  const sizeChangeHandler = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
    setSize(e.target.value);
  };
  const descrpChangeHandler = (e) => {
    setDescrp(e.target.value);
  };

  return (
    <form
      encType="multipart/formdata"
      className="xl:w-[70%] xl:mx-auto flex flex-col justify-start items-start"
      onSubmit={handleSubmit}
    >
      <div className="header flex justify-between w-full">
        <div className="flex space-x-16 items-center">
          <h3>Create a post</h3>
          <FontAwesomeIcon
            icon={faMicrophone}
            onClick={() => {
              getAddress(bangla);
            }}
            className="hover:cursor-pointer"
          />
          <button
            className="text-xl"
            type="button"
            onClick={() => {
              setBangla(!bangla);
            }}
          >
            {bangla ? (
              <h3>Bn: Click here to change to English</h3>
            ) : (
              <h3>En: Click here to change to Bangla</h3>
            )}
          </button>

          <h3 id="speakText"></h3>
        </div>

        <button
          className="font-mono text-[1.4rem] text-white bg-slate-600 px-8 py-2 rounded-lg font-thin hover:font-normal"
          type="submit"
        >
          Submit
        </button>
      </div>

      {error !== "" && <p className="text-red-900 text-[1.4rem]">{error}</p>}

      <div className="photouploader my-8 rounded-lg min-w-[100%] border-slate-600 border-[2px] p-8">
        <div className="flex justify-between text-3xl">
          <span>Add Photos</span>
        </div>
        <ImageUploader sendImages={imageHandler} />
      </div>
      <div className="addressbox w-[100%]">
        <h3>Add Address</h3>
        <AddressPicker getValues={handleLocationChange} />
        {locationCoordinates.longitude === null && (
          <p className="text-[1rem]">
            Location may not appear in map. Try to pick location from search if it exist.
          </p>
        )}
      </div>
      <h3 className="mt-8">Add Details</h3>
      <div className="mt-4 flex justify-between space-x-4 text-[1.4rem] w-[100%] xl:w-[80%]">
        <span>Monthly Rent (TK):</span>
        <input
          id="rent"
          value={rent}
          type="number"
          min="0"
          className="border-[2px] rounded-lg px-4"
          onChange={rentChangeHandler}
        />
        <span>Property Size (sq.ft.):</span>
        <input
          id="size"
          value={size}
          type="number"
          min="0"
          className="border-[2px] rounded-lg px-4"
          onChange={sizeChangeHandler}
        />
      </div>
      <div className="description text-[1.4rem] mt-4 w-[100%]">
        <h3>Description</h3>
        <textarea
          value={descrp}
          id="message"
          rows="8"
          className="block w-full text-[1.4rem] border-[2px] rounded-lg p-4 mt-4"
          placeholder="Write your thoughts here..."
          onChange={descrpChangeHandler}
        ></textarea>
      </div>
    </form>
  );
};

export default NewPost;
