import React, { useState } from 'react';
import accountStyles from '../account.module.css';
import { GalleryEdit, Edit, Link21 } from 'iconsax-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProfileCircle } from 'iconsax-react';

export default function Myprofile({ edit, picUpdate, updateBio }) {
  const nav = useNavigate();

  const { user } = useSelector((state) => state?.user.user);
  return (
    <>
      <article>
        <div className="mx-auto flex h-[12%] w-[85%] justify-between">
          <h1 className="font-semibold">Profile</h1>
          <button className="flex h-10 w-[197px] items-center justify-center self-center rounded bg-[var(--secondary-clr-lter-blue)] text-white ">
            <span>
              <Link21 size={20} />
            </span>{' '}
            Copy Profile Link
          </button>
        </div>
        <div className={accountStyles['mainPanelTop']}>
          <div className='flex-[1.5] relative max-w-[180px] min-w-[180px]'>
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="display image" className='w-[150px] h-[150px] rounded-full border-[10px] border-[var(--neutral-clr-grey-1)]'/>
            ) : (
              <ProfileCircle size={165} />
            )}
            <span className='absolute bottom-0 right-[30px] bg-[var(--neutral-clr-ltest-grey)] cursor-pointer rounded-full p-[8px]'>
              <GalleryEdit
                size={25}
                className='text-[#585dcc]'
                onClick={picUpdate}
              />
            </span>
          </div>
          <div className='flex-[3]'>
            <h1 className='mb-[0.5rem] flex flex-wrap content-center'>
              Bio{' '}
              <span onClick={updateBio} className='ml-[1rem] text-[#585dcc]'>
                <Edit size={20} />
              </span>
            </h1>
            <p>{user?.bio ? user?.bio : 'Add a bio to your profile.'}</p>
          </div>
        </div>
        <div className='w-[85%] mx-auto flex items-end'>
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
              <span>{user?.email}</span>
            </div>
          </section>
          <p className={accountStyles['edit']} onClick={edit}>
            Edit details
          </p>
        </div>
      </article>
    </>
  );
}
