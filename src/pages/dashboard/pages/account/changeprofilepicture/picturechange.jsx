import React, { useRef, useEffect } from 'react'
import picUpdate from './picturechange.module.css'
import { ProfileCircle } from 'iconsax-react'
import { useImageHandler } from '../hooks/useImageHandler'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { setProfilePicture } from '../../../../../app/slices/generalSlices/userSlice'
import { useUpdateProfilePictureMutation } from '../../../../../app/slices/apiSlices/accountSlices/accountMutationSlice'

export default function Picturechange () {
  const chooseref = useRef(null)
  const dropRef = useRef(null)
  const dispatch = useDispatch()
  const [handleEdit, handleCancel] = useOutletContext()

  // custom hook for uploading image
  const { image, caption, error, Handleimage, createFormData } = useImageHandler()

  // style format for drag and drop
  const handleStyleEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '2px dashed var(--secondary-clr-lter-purple)'
  }

  const handleStyleLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)'
  }

  const handleStyleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    dropRef.current.style.border = '1px solid var(--secondary-clr-lter-purple)'
    Handleimage(e.dataTransfer.files[0])
  }

  const [updateProfilePicture, { data, isSuccess, isLoading, isError, error: updatePictureError }] =
    useUpdateProfilePictureMutation()

  const handleUpdateProfilePicture = () => {
    updateProfilePicture({
        profilePicture: image
    })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProfilePicture(data.data.profilePicture));
      handleCancel();
    }
  }, [isSuccess])



  return (
    <div className={picUpdate['container']}>
      <div className={picUpdate['header']}>
        <p>Display Picture</p>
      </div>
      <div className={picUpdate['body']}>
        <section
          className={picUpdate['body_upload']}
          ref={dropRef}
          onDragEnter={e => handleStyleEnter(e)}
          onDragLeave={e => handleStyleLeave(e)}
          onDragOver={e => handleStyleEnter(e)}
          onDrop={e => handleStyleDrop(e)}
        >
          <aside className={picUpdate['profile']}>
            {!image ? (
              <ProfileCircle size='100' color='#555555' />
            ) : (
              <img src={image} alt='profile' />
            )}
          </aside>
          <p className={picUpdate['group_desc']}>Drag and drop Picture</p>
          <p className={picUpdate['group_desc2']}>OR</p>
          <form action="" encType="multipart/form-data">
          <label
            htmlFor='projectImage'
            onClick={() => chooseref.current.click()}
          >
            Select from computer
          </label>
          <input
            type='file'
            name='projectImage'
            id={picUpdate['projectImage']}
            accept='image/jpeg, image/png'
            ref={chooseref}
            onChange={e => Handleimage(e.target.files[0])}
          />
          </form>
        </section>
        <section className={picUpdate['upload_button']}>
          <button
            onClick={handleUpdateProfilePicture}
            disabled={isLoading || !image}
            style={{
              cursor: isLoading || !image ? 'not-allowed' : 'pointer',
              opacity: isLoading || !image ? '0.7' : '1'
            }}
          >
            Upload Photo
          </button>
        </section>
      </div>
    </div>
  )
}
