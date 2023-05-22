import React, { useState } from "react";

export const useImageHandler = () => {
<<<<<<< HEAD
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    // const [newImage, setNewImage] = useState("");
    const [caption, setCaption] = useState("");
=======
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
>>>>>>> 760d24e0f9dc7ea046884ddc9c32687dc523b38e

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
}
    let img = new Image();
    img.src = image;
    return {image, caption, error, Handleimage}
    };
    
