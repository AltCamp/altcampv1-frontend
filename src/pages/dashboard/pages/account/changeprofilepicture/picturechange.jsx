import React, { useRef, useEffect, useState } from 'react';
import picUpdate from './picturechange.module.css';
import { ProfileCircle } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { setProfilePicture } from '../../../../../app/slices/generalSlices/userSlice';
import { useUpdateProfilePictureMutation } from '../../../../../app/slices/apiSlices/accountSlice';
import { useMediaHandler } from './../hooks/useMediaHandler';
import Toaster from '../../../../../components/Toaster/Toaster';

export default function Picturechange() {
  const chooseref = useRef(null);
  const dropRef = useRef(null);
  const dispatch = useDispatch();
  const [handleEdit, handleCancel] = useOutletContext();

  // custom hook for uploading image
  const { image, handleMedia, removeImage } = useMediaHandler();

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

  // toast notification state manangement

  const [state, setState] = useState({
    toastConfig: {
      show: false,
      title: null,
      text: null,
      type: 'info',
    },
  });

  const handleStateUpdate = (newState) => {
    setState({
      ...state,
      ...newState,
    });
  };

  const handleCloseToast = () =>
    handleStateUpdate({
      toastConfig: { show: false, title: null, text: null },
    });

  const [updateProfilePicture, { data, error, isSuccess, isLoading, isError }] =
    useUpdateProfilePictureMutation();

  const handleUpdateProfilePicture = () => {
    updateProfilePicture({
      profilePicture: image,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleStateUpdate({
        toastConfig: {
          show: true,
          text: data?.message,
          type: 'success',
        },
      });
      dispatch(setProfilePicture(data.data.profilePicture));
      setTimeout(() => {
        handleCloseToast();
        handleCancel();
      }, 2000);
    } else if (isError) {
      handleStateUpdate({
        toastConfig: {
          show: true,
          title: 'Upload Error!',
          text: error?.data?.message,
          type: 'error',
        },
      });
      removeImage();
      setTimeout(() => handleCloseToast(), 3000);
    }
  }, [isSuccess, isError]);

  return (
    <div className={picUpdate['container']}>
      <div className={picUpdate['header']}>
        <p>Display Picture</p>
      </div>
      <div className={picUpdate['body']}>
        <section
          className={picUpdate['body_upload']}
          ref={dropRef}
          onDragEnter={(e) => handleStyleEnter(e)}
          onDragLeave={(e) => handleStyleLeave(e)}
          onDragOver={(e) => handleStyleEnter(e)}
          onDrop={(e) => handleStyleDrop(e)}
        >
          <aside className={picUpdate['profile']}>
            {!image ? (
              <ProfileCircle size="100" color="#555555" />
            ) : (
              <img src={image} alt="profile" />
            )}
          </aside>
          <p className={picUpdate['group_desc']}>Drag and drop Picture</p>
          <p className={picUpdate['group_desc2']}>OR</p>
          <form action="" encType="multipart/form-data">
            <label
              htmlFor="projectImage"
              onClick={() => chooseref.current.click()}
            >
              Select from device
            </label>
            {!image && <p className="my-5 text-sm">MAXIMUM SIZE: 500Kb</p>}

            <input
              type="file"
              name="projectImage"
              id={picUpdate['projectImage']}
              accept="image/jpeg, image/png"
              ref={chooseref}
              onChange={(e) => handleMedia(e.target.files[0])}
            />
          </form>
        </section>

        <Toaster
          show={state.toastConfig.show}
          title={state.toastConfig.title}
          type={state.toastConfig.type}
          message={state.toastConfig.text}
          handleClose={handleCloseToast}
        />
        <section className={picUpdate['upload_button']}>
          <button
            onClick={handleUpdateProfilePicture}
            disabled={isLoading || !image}
            style={{
              cursor: isLoading || !image ? 'not-allowed' : 'pointer',
              opacity: isLoading || !image ? '0.7' : '1',
            }}
          >
            {isLoading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </section>
      </div>
    </div>
  );
}
