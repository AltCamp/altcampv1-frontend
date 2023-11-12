import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { useGetPostByIdQuery } from '../../../../app/slices/apiSlices/contentsSlice';

export default function ViewImage() {
  const [image, setImage] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { postId, imageId } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useGetPostByIdQuery(postId);

  useEffect(() => {
    if (data) {
      setImage(data?.data?.media);
    }
  }, [data]);

  const imageUrl = location?.state?.media;

  useEffect(() => {
    if (image) {
      if (Number(imageId) > image.length) {
        navigate(`/dashboard/feed/post/${postId}`);
      }
    }
  }, [image]);

  // const image = data?.data?.media;
  // console.log(image);
  // console.log('image', typeof imageId);

  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 flex h-screen w-screen items-center justify-between overflow-scroll bg-black/90 px-5 text-white ">
      <div
        className="absolute left-5 top-4 z-50"
        onClick={() => navigate(`/dashboard/feed/post/${postId}`)}
      >
        <MdOutlineClose size={22} className="cursor-pointer" />
      </div>
      <AiOutlineArrowLeft
        size={22}
        className={`absolute left-5 top-1/2 z-50 cursor-pointer ${
          imageId <= 1 && 'hidden'
        }`}
        onClick={() => {
          navigate(
            `/dashboard/feed/post/${postId}/images/${Number(imageId) - 1}`
          );
        }}
      />
      {isLoading && !imageUrl && (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={image?.length > 0 ? image[Number(imageId) - 1]?.url : imageUrl}
        alt={`Post media`}
        className={`relative h-full w-full object-scale-down`}
      />
      {image && (
        <AiOutlineArrowRight
          size={22}
          className={`absolute right-5 top-1/2 z-50 cursor-pointer ${
            Number(imageId) >= image?.length && 'hidden'
          }`}
          onClick={() => {
            navigate(
              `/dashboard/feed/post/${postId}/images/${Number(imageId) + 1}`
            );
          }}
        />
      )}
    </div>
  );
}
