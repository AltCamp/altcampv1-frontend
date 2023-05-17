import React,{useRef} from 'react'
import  picUpdate from './picturechange.module.css'
import { ProfileCircle } from 'iconsax-react'
import { useImageHandler } from '../hooks/useImageHandler'

export default function Picturechange() {
    const chooseref = useRef(null)
    const dropRef = useRef(null)

    // custom hook for uploading image
    const {image, caption, error, Handleimage} = useImageHandler()

      // style format for drag and drop
  const handleStyleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border =
      "2px dashed var(--secondary-clr-lter-purple)";
  };
  const handleStyleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = "1px solid var(--secondary-clr-lter-purple)";
  };
  const handleStyleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.style.border = "1px solid var(--secondary-clr-lter-purple)";
    Handleimage(e.dataTransfer.files[0]);
  };
  return (
    <div className={picUpdate['container']}>
    <div className={picUpdate['header']}>
        <p>Display Picture</p>
    </div>
    <div className={picUpdate['body']}>
        <section className={picUpdate["body_upload"]}
        ref={dropRef}
        onDragEnter={(e) => handleStyleEnter(e)}
        onDragLeave={(e) => handleStyleLeave(e)}
        onDragOver={(e) => handleStyleEnter(e)}
        onDrop={(e) => handleStyleDrop(e)}>
            <aside className={picUpdate['profile']}>
                {!image ? <ProfileCircle size="100" color="#555555"/>: <img src={image} alt="profile" />}
            </aside>
        <p className={picUpdate["group_desc"]}>
                  Drag and drop Picture
                </p>
                <p className={picUpdate["group_desc2"]}>OR</p>
                <label
                  htmlFor="projectImage"
                  onClick={() => chooseref.current.click()}
                >
                  Select from computer
                </label>
                <input
                  type="file"
                  name="projectImage"
                  id={picUpdate["projectImage"]}
                  accept="image/jpeg, image/png"
                  ref={chooseref}
                  onChange={(e) => Handleimage(e.target.files[0])}
                />
        </section>
        <section className={picUpdate["upload_button"]}>
            <button> Upload Photo</button>
        </section>
    </div>
</div>
  )
}
