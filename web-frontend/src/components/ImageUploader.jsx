import { useEffect, useState } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = (props) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [...imageFiles];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      validImageFiles.push(file);
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
            props.sendImages(images);
          }
          if (images.length === imageFiles.length) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  return (
    <div className="flex justify-start flex-wrap">
      {images.length > 0
        ? images.map((image, idx) => {
            return (
              <Card
                key={idx}
                className={
                  "m-8 max-h-[10rem] max-w-[15rem] xl:max-h-[16rem] xl:max-w-[24rem] p-0 flex justify-center items-center"
                }
              >
                <img className="max-h-[100%] max-w-[100%]" src={image} alt="" />{" "}
              </Card>
            );
          })
        : null}
      <div>
        <label htmlFor="newPostFile">
          <Card className="m-8 hover:bg-slate-600/60 bg-slate-600/80 backdrop-blur-lg h-[10rem] w-[15rem] xl:h-[16rem] xl:w-[24rem] display flex flex-col justify-center items-center space-y-5 font-mono cursor-pointer text-white">
            <FontAwesomeIcon icon={faAdd} className="text-[2rem] xl:text-[3rem]" />
          </Card>
        </label>
        <input
          type="file"
          id="newPostFile"
          onChange={changeHandler}
          accept="image/*"
          multiple
          hidden
        />
      </div>
    </div>
  );
};

export default ImageUploader;
