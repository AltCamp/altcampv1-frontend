import React, { useState } from "react";

export const useMediaHandler = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [caption, setCaption] = useState("");

  const handleMedia = (file) => {
    let files = file;
    let fileType = files.type;
    let filename = files.name;
    let validExtension = ["image/png", "image/jpeg", "image/webp"];
    let validVideoExtension = ["video/webm", "video/mp4", "video/*"];

    if (validExtension.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        setImage(fileReader.result);
        setCaption(filename);
      };
    } else if (validVideoExtension.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        setVideo(fileReader.result);
        setCaption(filename);
      };
    } else {
      setError("Please upload either a JPEG or PNG format file");
      return false;
    }
  };
  return { image, caption, error, handleMedia, video };
};
