import React, { useRef, useState } from 'react';
import projectStyle from '../myprojects.module.css';
import { useMediaHandler } from '../../../../../../hooks/useMediaHandler';

export default function Uploadproject({ display }) {
  const chooseref = useRef(null);
  const dropRef = useRef(null);

  // custom hook for uploading image
  const { image, caption, error, handleMedia } = useMediaHandler();

  // style format for drag and drop
  const handleStyleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border =
      '2px dashed var(--secondary-clr-lter-purple)';
  };
  const handleStyleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)';
  };
  const handleStyleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)';
    handleMedia(e.dataTransfer.files[0]);
  };

  return (
    <main className={projectStyle['project_details']}>
      <h1 className={projectStyle['title']}>Project</h1>
      <aside className={projectStyle['upload_body']}>
        <section className={projectStyle['projectsName']}>
          <label htmlFor="project_name" className={projectStyle['name_label']}>
            Project Name
          </label>
          <input
            type="text"
            name="project_name"
            id="project_name"
            placeholder="type your project name here"
          />
        </section>
        <section className={projectStyle['projectLink']}>
          <label htmlFor="project_link" className={projectStyle['link_label']}>
            Project Link
          </label>
          <input
            type="text"
            name="project_link"
            id="project_link"
            placeholder="paste your project link here"
          />
        </section>
        <section className={projectStyle['project_image']}>
          <div>
            <div className={projectStyle['image_desc']}>
              <h2>Add an image</h2>
              <p>Add an image that can represent your project</p>
            </div>
            <div
              className={projectStyle['file_input']}
              ref={dropRef}
              onDragEnter={(e) => handleStyleEnter(e)}
              onDragLeave={(e) => handleStyleLeave(e)}
              onDragOver={(e) => handleStyleEnter(e)}
              onDrop={(e) => handleStyleDrop(e)}
            >
              <div className={projectStyle['image_group']}>
                <p className={projectStyle['group_desc']}>
                  Drag and drop images. Supported format: JPEG OR PNG
                </p>
                <p className={projectStyle['group_desc2']}>OR</p>
                <label
                  htmlFor="projectImage"
                  onClick={() => chooseref.current.click()}
                >
                  Select from computer
                </label>
                <input
                  type="file"
                  name="projectImage"
                  id={projectStyle['projectImage']}
                  accept="image/jpeg, image/png"
                  ref={chooseref}
                  onChange={(e) => Handleimage(e.target.files[0])}
                />
                {image && (
                  <div className={projectStyle['uploaded_data']}>
                    <span>
                      <img
                        src={image}
                        alt=""
                        className={projectStyle['uploaded_image']}
                      />
                    </span>
                    <span className={projectStyle['image_title']}>
                      {' '}
                      {caption}
                    </span>
                  </div>
                )}
                {error && <p className={projectStyle['error']}>{error}</p>}
              </div>
            </div>
          </div>
        </section>
      </aside>
      <div className={projectStyle['upload_group']}>
        <button onClick={display} className={projectStyle['upload_button']}>
          Upload
        </button>
      </div>
    </main>
  );
}
