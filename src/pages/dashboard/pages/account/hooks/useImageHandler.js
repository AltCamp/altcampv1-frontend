import React, { useState } from "react";

export const useImageHandler = () => {
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");

  const Handleimage = (file) => {
    let files = file;
    let fileType = files.type;
    let filename = files.name;
    let validExtension = ["image/png", "image/jpeg"];

    if (validExtension.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        setImage(fileReader.result);
        setCaption(filename);
      };
    } else {
      setError("Please upload either a JPEG or PNG format file");
      return false;
    }
  };
    return {image, caption, error, Handleimage}
    };
    
