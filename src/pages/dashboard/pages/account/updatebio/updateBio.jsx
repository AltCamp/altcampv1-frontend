import React, {useEffect, useState} from 'react'
import bioStyles from "./updatebio.module.css"
import { useUpdateBioMutation } from '../../../../../app/slices/apiSlices/accountSlices/accountMutationSlice'
import { useDispatch } from 'react-redux'
import { setUserBio} from '../../../../../app/slices/generalSlices/userSlice'
import { useOutletContext } from 'react-router-dom'

export default function Updatebio() {
    const [bio, setBio] = useState("")
    const [count, setCount] = useState(0)
    const dispatch = useDispatch();
    const [handleedit, handleCancel] = useOutletContext();

    const handleText = (e)=>{
        if(count >= 100){
            setBio((prev)=> prev + '')
        }else{
            setBio(e.target.value)
        }
    }
    const handleback = (e)=>{
        if(e.keyCode === 8){
            setCount((prev)=> prev - 1)
        }
    }

    useEffect(() => {
        if(bio.trim().length === 0){
            setCount(0)
        }else{
            setCount(bio.trim().split(" ").length)
        }
    },[bio])

    const [updateBio, { data, isSuccess, isLoading, isError, error}] = useUpdateBioMutation();
    const handleUpdateBio = () => {
        updateBio({
            "bio": bio
        })
        setBio("");
    };
    useEffect(()=>{
        if (isSuccess){
            dispatch(setUserBio(data?.data.bio));
            handleCancel();
        }
    },[isSuccess])

  return (
    <div className={bioStyles['container']}>
    <div className={bioStyles['header']}>
        <p>Edit Bio</p>
    </div>
    <div className={bioStyles['body']}>
    <section className={bioStyles["body_bio"]}>
             <textarea name="bio" id={bioStyles["textarea"]} placeholder='write your bio...'
             value={bio}
             onChange={(e)=> handleText(e)}
             onKeyDown={(e)=> handleback(e)}
             >
             </textarea>
        <p className={bioStyles["count"]}> word count : {count} / 100 </p>
    </section>
    <aside className={bioStyles["save_button"]}>
        <button disabled={count <= 0 || isLoading} onClick={handleUpdateBio}> {isLoading? "saving...": "save"} </button>
    </aside>
    </div>
</div>
  )
}
