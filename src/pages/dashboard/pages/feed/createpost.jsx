import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { LuShare } from 'react-icons/lu';

import { BiSolidImageAdd } from 'react-icons/bi';

import { IoMdClose } from 'react-icons/io';

import { ArrowCircleLeft, ProfileCircle, CloseCircle } from 'iconsax-react';

import { useCreatePostHandler } from '../../../../hooks/useCreatePostHandler';

import { useCreatePostMutation } from '../../../../app/slices/apiSlices/contentsSlice';

import VerifyEmailPopUp from '../../components/verifyEmailPopUp';

import { useSelector } from 'react-redux';

export default function Createpost() {
  const [queryError, setQueryError] = useState();

  const { user } = useSelector((state) => state?.user);

  const {
    content,
    // tags,
    files,
    imagePreviews,
    handleContentChange,
    handleTagsChange,
    handleFileChange,
    removeFile,
    getFormData,
  } = useCreatePostHandler();

  const chooseref = useRef(null);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const navigate = useNavigate();

  // style format for drag and drop
  const handleStyleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = '2px dashed var(--secondary-clr-lter-blue)';
  };

  const handleStyleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = '';
  };

  const handleStyleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = '';
    handleFileChange(e.dataTransfer.files[0]);
  };

  const [
    createPost,
    { data, isSuccess, isLoading, isError, error: createPostError },
  ] = useCreatePostMutation();

  useEffect(() => {
    const formData = getFormData();
  }, [content, files]);

  const handleCreatePost = () => {
    const formData = getFormData();
    createPost(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/feed');
    }
    if (isError) {
      setQueryError(createPostError?.data.message);
    }
  }, [isSuccess]);

  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-scroll bg-black/50 sm:top-[4.9rem] sm:h-full xs:pb-16  ">
      <div className="relative flex h-fit w-[35rem] max-w-[35rem] flex-col items-center gap-2 rounded-[14px] bg-white p-4 md:p-3 xs:h-full xs:w-full xs:overflow-scroll ">
        <CloseCircle
          size="20"
          className="absolute -right-8 top-0 cursor-pointer text-white sm:-top-8 sm:left-1/2 sm:-translate-x-1/2 "
          onClick={() => navigate('/dashboard/feed')}
        />
        <div className="flex w-full flex-col">
          {/* verifyEmailPopUp */}
          <VerifyEmailPopUp
            queryError={queryError}
            setQueryError={setQueryError}
          />

          <div className="flex w-full flex-col gap-1 pb-2">
            <div
              className="mb-5 hidden cursor-pointer items-center gap-2 text-[14px] font-medium text-neutral-700 xs:flex "
              onClick={() => navigate('/dashboard/feed')}
            >
              <ArrowCircleLeft
                size="20"
                className=" cursor-pointer text-black "
              />
              <div className="">Back to Feed</div>
            </div>
            <h1 className="w-fit text-[18px] font-semibold text-neutral-900">
              Add a post
            </h1>
            <p className="hidden text-[14px] font-normal text-neutral-600">
              To successfully upload your file, make sure they follow the
              guidelines.
            </p>
          </div>

          <div className="mb-2 flex items-center gap-3">
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
            className="flex h-full w-full flex-col gap-3 overflow-scroll p-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}
            encType="multipart/form-data"
          >
            <div
              className="flex h-full w-full flex-col gap-1 rounded-lg border border-neutral-200 p-1 focus-within:ring-2 focus-within:ring-secondary-400 focus-within:ring-offset-2 focus:border-primary-600"
              ref={dropRef}
              onDragEnter={(e) => handleStyleEnter(e)}
              onDragLeave={(e) => handleStyleLeave(e)}
              onDragOver={(e) => handleStyleEnter(e)}
              onDrop={(e) => handleStyleDrop(e)}
            >
              <textarea
                name="text"
                id="text"
                placeholder="Write something..."
                ref={inputRef}
                value={content}
                className="h-[4rem] w-full resize-none border-none p-0 outline-none focus:outline-none focus:ring-0 xs:h-28"
                onChange={(e) => handleContentChange(e.target.value)}
              ></textarea>
              <div
                className={`flex h-auto max-h-[18rem] w-full items-center justify-between gap-2
           
            `}
              >
                {imagePreviews?.map((preview, index) => (
                  <div
                    key={index}
                    className="relative aspect-video h-full w-full"
                  >
                    <div
                      className="absolute right-1 top-1 flex h-8 w-8 cursor-pointer items-center justify-center  rounded-full  bg-black/50  text-white transition-all hover:shadow-md"
                      onClick={() => removeFile(index)}
                    >
                      <IoMdClose size={25} />
                    </div>
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="h-full w-full overflow-hidden object-cover"
                    />
                  </div>
                ))}
              </div>
              <label
                htmlFor="media"
                className="w-fit cursor-pointer text-secondary-400"
              >
                <BiSolidImageAdd size={28} />
                <input
                  type="file"
                  name="media"
                  id="media"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  ref={chooseref}
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn mt-0 w-fit self-end px-9 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
