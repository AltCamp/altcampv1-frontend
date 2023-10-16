import React, { useState } from 'react';

export const useCreatePostHandler = () => {
  const [content, setContent] = useState('');
  // const [tags, setTags] = useState([]);
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTagsChange = (selectedTags) => {
    setTags(selectedTags);
  };

  const handleFileChange = (file) => {
    // Check if the file type is valid
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/gif' ||
      file.type === 'image/webp'
    ) {
      setFiles([...files, file]);

      // Create a URL for the image and add it to previews
      const imageUrl = URL.createObjectURL(file);
      setImagePreviews([...imagePreviews, imageUrl]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const getFormData = () => {
    const formData = new FormData();

    formData.append('content', content);
    // formData.append('tags', JSON.stringify(tags));

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return formData;
  };

  return {
    content,
    // tags,
    files,
    imagePreviews,
    handleContentChange,
    handleTagsChange,
    handleFileChange,
    removeFile,
    getFormData,
  };
};
