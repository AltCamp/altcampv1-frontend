import { useState, useEffect } from 'react';
import client from '../../../../app/sanity/client-config';
import contribute from '../../../../assets/general/contribute.png';
import iconLogo from '../../../../assets/general/logonotext.svg';
import ReactTimeAgo from 'react-time-ago';
import Slider from 'react-slick';
import { Tooltip } from 'flowbite-react';

import {
  useGetFrontendRepoQuery,
  useGetFrontendRepoContributorsQuery,
  useGetBackendRepoQuery,
  useGetBackendRepoContributorsQuery,
} from '../../../../app/slices/apiSlices/githubApiSlice';

export default function RightSidebar() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchPosts() {
      const data =
        await client.fetch(`*[_type in ["post", "project"]] | order(_createdAt desc) [0...5] {
  _id,
  title,
  "slug": slug.current,
  author[]->{
    _id,
    name,
    "image": image.asset->url,
    twitter
  },
  summary,
  publishedAt,
  _createdAt
}`);

      const result = await data;
      setPosts(result);
    }
    if (!posts) {
      fetchPosts();
    }
  }, []);
  const {
    data: frontendData,
    isLoading: frontendLoading,
    isSuccess: frontendSuccess,
    isError: frontendIsError,
    error: frontendError,
  } = useGetFrontendRepoQuery();

  const {
    data: frontendContributors,
    isLoading: frontendContributorsLoading,
    isSuccess: frontendContributorsSuccess,
    isError: frontendContributorsIsError,
    error: frontendContributorsError,
  } = useGetFrontendRepoContributorsQuery();

  const {
    data: backendData,
    isLoading: backendLoading,
    isSuccess: backendSuccess,
    isError: backendIsError,
    error: backendError,
  } = useGetBackendRepoQuery();

  const {
    data: backendContributors,
    isLoading: backendContributorsLoading,
    isSuccess: backendContributorsSuccess,
    isError: backendContributorsIsError,
    error: backendContributorsError,
  } = useGetBackendRepoContributorsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <div
      className="flex h-auto w-[20rem] min-w-[20rem] flex-col items-center overflow-y-scroll
    bg-[#F8F9FA] py-3 text-neutral-900 shadow-[0px_2px_12px_0px_#56565626] xl:min-w-[16rem] lg:hidden"
    >
      <div className="flex w-full flex-col items-center gap-3 border-b-2 border-[#CED4DA] px-5 pb-5">
        <h3 className="text-sm">Become a top contributor</h3>
        <div className="flex w-full flex-col items-center gap-1 rounded-md bg-white p-2 shadow-lg">
          <Slider {...settings} className="w-full">
            <div className="!flex w-full flex-col items-center">
              {frontendLoading && (
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
              {frontendData && (
                <div className="flex flex-col gap-2">
                  <a
                    href={frontendData.html_url}
                    target="_blank"
                    className=""
                    rel="noreferrer"
                  >
                    <h3 className="font-semibold hover:underline">
                      {frontendData.name}
                    </h3>
                  </a>
                  <div className="text-sm">
                    We currently have
                    <a
                      href={`https://github.com/AltCamp/altcampv1-frontend/issues`}
                      target="_blank"
                      className="font-semibold underline"
                      rel="noreferrer"
                    >
                      {` ${frontendData.open_issues_count} ${
                        frontendData.open_issues_count > 1 ? 'issues' : 'issue'
                      } `}
                    </a>
                    that
                    <span>
                      {` ${
                        frontendData.open_issues_count > 1 ? 'need' : 'needs'
                      } `}
                    </span>
                    your help
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <h3 className="font-semibold">Our Contributors</h3>
                    <div className="flex flex-col gap-2 px-2">
                      <div className="flex flex-wrap -space-x-2">
                        {frontendContributors?.map((contributor, index) => (
                          <Tooltip
                            content={contributor.login}
                            placement="top"
                            style="light"
                            key={index}
                          >
                            <a
                              href={contributor.html_url}
                              className=""
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                                src={contributor.avatar_url}
                                alt={`${contributor.login} avatar`}
                              />
                            </a>
                          </Tooltip>
                        ))}
                        {/* {frontendContributors && (
                          <a
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800"
                            href="https://github.com/AltCamp/altcampv1-frontend/graphs/contributors"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {`+${frontendContributors.length}`}
                          </a>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {frontendData && (
                <a
                  className="auth-btn flex w-fit items-center justify-center p-1 px-3 text-sm font-semibold"
                  href="https://github.com/AltCamp/altcampv1-frontend"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Started
                </a>
              )}
            </div>

            <div className="!flex w-full flex-col items-center">
              {backendLoading && (
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
              {backendData && (
                <div className="flex flex-col gap-2">
                  <a
                    href={backendData.html_url}
                    target="_blank"
                    className=""
                    rel="noreferrer"
                  >
                    <h3 className="font-semibold hover:underline">
                      {backendData.name}
                    </h3>
                  </a>
                  <div className="text-sm">
                    We currently have
                    <a
                      href={`https://github.com/AltCamp/altcampv1-backend/issues`}
                      target="_blank"
                      className="font-semibold underline"
                      rel="noreferrer"
                    >
                      {` ${backendData.open_issues_count} ${
                        backendData.open_issues_count > 1 ? 'issues' : 'issue'
                      } `}
                    </a>
                    that
                    <span>
                      {` ${
                        backendData.open_issues_count > 1 ? 'need' : 'needs'
                      } `}
                    </span>
                    your help
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <h3 className="font-semibold">Our Contributors</h3>
                    <div className="flex flex-col gap-2 px-2">
                      <div className="flex flex-wrap -space-x-2">
                        {backendContributors?.map((contributor, index) => (
                          <Tooltip
                            content={contributor.login}
                            placement="top"
                            style="light"
                            key={index}
                          >
                            <a
                              href={contributor.html_url}
                              className=""
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                                src={contributor.avatar_url}
                                alt={`${contributor.login} avatar`}
                              />
                            </a>
                          </Tooltip>
                        ))}
                        {/* {backendContributors && (
                          <a
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800"
                            href="https://github.com/AltCamp/altcampv1-backend/graphs/contributors"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {`+${backendContributors.length}`}
                          </a>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {backendData && (
                <a
                  className="auth-btn flex w-fit items-center justify-center p-1 px-3 text-sm font-semibold "
                  href="https://github.com/AltCamp/altcampv1-backend"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Started
                </a>
              )}
            </div>

            <div className="!flex w-full flex-col items-center">
              <img src={contribute} alt="" className="w-full object-contain" />
              <a
                className="auth-btn flex w-fit items-center justify-center p-1 px-3 text-sm font-semibold "
                href="https://github.com/orgs/AltCamp/repositories"
                target="_blank"
                rel="noreferrer"
              >
                Get Started
              </a>
            </div>
          </Slider>
        </div>
      </div>

      {/* Blog posts */}
      <div className="flex flex-col items-center p-2 pt-5">
        <div className=" rounded-md bg-white p-2 py-3 shadow-lg">
          <div className="flex flex-col border-b-2 border-[#CED4DA] pb-2">
            <div className="flex items-center gap-1 font-medium ">
              <img src={iconLogo} alt="" className="w-[2rem]" />
              <h3 className="text-[1.1rem] ">AltCampBlog</h3>
            </div>
            <p className="text-sm">Trending / Latest</p>
          </div>

          <div className="flex flex-col ">
            {posts?.map((post) => (
              <div
                key={post._id}
                className="flex flex-col gap-1 border-b-2 border-[#CED4DA] py-2 "
              >
                <a
                  href={`https://altcampblog.vercel.app/blog/${post.slug}`}
                  target="_blank"
                  className=""
                  rel="noreferrer"
                >
                  <h3 className="text-sm font-medium">{post.title}</h3>
                </a>
                <p className="line-clamp-2 text-xs ">{post.summary}</p>
                <div className="">
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <img
                        src={post.author[0].image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="text-xs font-medium text-neutral-900">
                        {post.author[0].name}
                      </div>
                      <div className="text-[0.6rem] text-neutral-600">
                        {post?._createdAt && (
                          <ReactTimeAgo
                            date={post?._createdAt}
                            locale="en-US"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
