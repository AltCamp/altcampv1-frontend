import React, { useState } from 'react';
import accountStyles from '../account.module.css';
import { GalleryEdit, Edit, Link21 } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProfileCircle } from 'iconsax-react';
import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';

export default function Myprofile({ edit, picUpdate, updateBio }) {
  const nav = useNavigate();
  const [queryError, setQueryError] = useState('');

  const { user } = useSelector((state) => state?.user);

  const handleVerify = () => {
    setQueryError('Email is not verified');
  };
  return (
    <>
      <article>
        <div className="mx-auto flex h-[12%] w-[85%] justify-between">
          <h1 className="font-semibold">Profile</h1>
          <button className="flex h-10 w-[197px] items-center justify-center self-center rounded bg-secondary-400 text-white ">
            <span>
              <Link21 size={20} />
            </span>{' '}
            Copy Profile Link
          </button>
        </div>
        <div className={accountStyles['mainPanelTop']}>
          <div className="relative min-w-[180px] max-w-[180px] flex-[1.5]">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="display image"
                className="h-[150px] w-[150px] rounded-full border-[10px] border-neutral-500"
              />
            ) : (
              <ProfileCircle size={165} />
            )}
            <span className="absolute bottom-0 right-[30px] cursor-pointer rounded-full bg-neutral-100 p-[8px]">
              <GalleryEdit
                size={25}
                className="text-secondary-500"
                onClick={picUpdate}
              />
            </span>
          </div>
          <div className="flex-[3]">
            <h1 className="mb-[0.5rem] flex flex-wrap content-center">
              Bio{' '}
              <span
                onClick={updateBio}
                className="ml-[1rem] text-secondary-500"
              >
                <Edit size={20} />
              </span>
            </h1>
            <p>{user?.bio ? user?.bio : 'Add a bio to your profile.'}</p>
          </div>
        </div>
        <div className="mx-auto flex w-[85%] items-end">
          <section className={accountStyles['mainPanelBottom_profileDetails']}>
            <div className={accountStyles['profileDetails_fName']}>
              <span>First Name</span>
              <span>{user?.firstName}</span>
            </div>
            <div className={accountStyles['profileDetails_lName']}>
              <span>Last Name</span>
              <span>{user?.lastName}</span>
            </div>
            {user?.owner?.altSchoolId && (
              <div className={accountStyles['profileDetails_sNum']}>
                <span>Student Number</span>
                <span>{user?.owner.altSchoolId}</span>
              </div>
            )}
            <div className={accountStyles['profileDetails_rank']}>
              <span>Rank</span>
              <span>{user?.accountType}</span>
            </div>
            {user?.learning && (
              <div className={accountStyles['profileDetails_lCircle']}>
                <span>Learning Circle</span>
                <span>{lCircle}</span>
              </div>
            )}
            <div className={accountStyles['profileDetails_email']}>
              <span>Email</span>
              <span className="flex items-center">
                {user?.email}
                <span className="ms-4">
                  {user.emailIsVerified ? (
                    <p className="rounded-full border border-teal-200 px-1 text-green-400">
                      Verified
                    </p>
                  ) : (
                    <p
                      className="cursor-pointer rounded-full border border-orange-500 px-1 text-orange-900"
                      onClick={handleVerify}
                    >
                      Not verified
                    </p>
                  )}
                </span>
              </span>
            </div>
          </section>
          <p className={accountStyles['edit']} onClick={edit}>
            Edit details
          </p>
          <VerifyEmailPopUp
            queryError={queryError}
            setQueryError={setQueryError}
          />
        </div>
      </article>
    </>
  );
}
