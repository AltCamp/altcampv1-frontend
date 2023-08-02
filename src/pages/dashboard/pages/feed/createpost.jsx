import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { LuShare } from 'react-icons/lu';

import { ArrowRotateLeft, ProfileCircle } from 'iconsax-react';

import { useMediaHandler } from '../account/hooks/useMediaHandler';

import { useCreatePostMutation } from '../../../../app/slices/apiSlices/feedSlice';

import VerifyEmailPopUp from '../../components/verifyEmailPopUp';

import { useSelector } from 'react-redux';

export default function Createpost({ setToggleCreatePost }) {
  const [content, setContent] = useState(false);

  const [queryError, setQueryError] = useState();

  const { user } = useSelector((state) => state?.user?.user);

  const chooseref = useRef(null);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const navigate = useNavigate();
  // custom hook for uploading image
  const { image, video, caption, error, handleMedia, createFormData } =
    useMediaHandler();

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

  const [
    createPost,
    { data, isSuccess, isLoading, isError, error: createPostError },
  ] = useCreatePostMutation();

  const handleCreatePost = () => {
    createPost({
      content,
      // media: image
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setToggleCreatePost(false);
    }
    if (isError) {
      setQueryError(createPostError?.data.message);
    }
  }, [isSuccess]);

  return (
    <div className="flex w-full flex-col">
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <div className="flex w-full flex-col gap-4 pb-4">
        <h1 className="text-[18px] font-semibold text-neutral-900">
          Add a post
        </h1>
        <p className="text-[14px] font-normal text-neutral-600">
          To successfully upload your file, make sure they follow the
          guidelines.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ProfileCircle
              size={45}
              color="#555555"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="font-semibold text-neutral-900 ">
          {user?.firstName} {user?.lastName}
        </div>
      </div>

      <form
        action=""
        className="flex w-full flex-col gap-4 py-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost();
        }}
      >
        <div className="flex w-full flex-col gap-4">
          <textarea
            name="text"
            id="text"
            cols="30"
            rows="10"
            placeholder="Write something..."
            ref={inputRef}
            className="h-16 w-full resize-none rounded-lg border border-neutral-200 p-4 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div
          className={`flex h-[15rem] w-full flex-col items-center justify-center border-2
          border-dashed border-secondary-50 
          `}
          ref={dropRef}
          onDragEnter={(e) => handleStyleEnter(e)}
          onDragLeave={(e) => handleStyleLeave(e)}
          onDragOver={(e) => handleStyleEnter(e)}
          onDrop={(e) => handleStyleDrop(e)}
        >
          {image ? (
            <div className="relative h-full w-full">
              <label
                htmlFor="media"
                className="absolute right-1 top-1 flex h-8 w-24 cursor-pointer items-center justify-center gap-1 rounded-md border border-secondary-400 bg-white text-[14px] font-medium text-secondary-400 transition-all hover:shadow-md"
              >
                Change <ArrowRotateLeft size="18" color="#585DCC" />
              </label>
              <input
                type="file"
                name="media"
                id="media"
                ref={chooseref}
                onChange={(e) => handleMedia(e.target.files[0])}
                className="hidden"
              />
              <img
                src={image}
                alt="media"
                className="h-full w-full object-cover"
              />
            </div>
          ) : video ? (
            <div className="relative h-full w-full">
              <label
                htmlFor="media"
                className="absolute right-1 top-1 flex h-8 w-24 cursor-pointer items-center justify-center gap-1 rounded-md border border-secondary-400 bg-white text-[14px] font-medium text-secondary-400 transition-all hover:shadow-md"
              >
                Change <ArrowRotateLeft size="18" color="#585DCC" />
              </label>
              <input
                type="file"
                name="media"
                id="media"
                ref={chooseref}
                onChange={(e) => handleMedia(e.target.files[0])}
                className="hidden"
              />
              <video
                className="h-full w-full object-cover"
                controls
                width="250"
              >
                <source src={video} type="video/*" />
              </video>
            </div>
          ) : (
            <div className="flex w-[60%] flex-col items-center justify-center gap-4 text-center tab:w-full">
              <LuShare className="text-[2rem] text-secondary-500 " />
              <p className="text-[14px] font-normal text-neutral-600 ">
                Drag and drop files to upload resources. For photo, use JPG or
                PNG. For videos, use MP4 or MOV.
              </p>
              <label
                htmlFor="media"
                className="auth-btn flex w-fit items-center justify-center px-4 py-2"
              >
                Select from your device
              </label>
              <input
                type="file"
                name="media"
                id="media"
                ref={chooseref}
                onChange={(e) => handleMedia(e.target.files[0])}
                className="hidden"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="auth-btn w-fit self-end px-9 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}
