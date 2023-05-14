import React, {useEffect, useState} from 'react'
import bioStyles from "./updatebio.module.css"

export default function Updatebio() {
    const [bio, setBio] = useState("")
    const [count, setCount] = useState(0)

    useEffect(() => {
        if(bio.trim().length === 0){
            setCount(0)
        }else{
            setCount(bio.trim().split(" ").length)
        }
    },[bio])
  return (
    <div className={bioStyles['container']}>
    <div className={bioStyles['header']}>
        <p>Edit Bio</p>
    </div>
    <div className={bioStyles['body']}>
    <section className={bioStyles["body_bio"]}>
             <textarea name="bio" id={bioStyles["textarea"]} placeholder='write your bio...'
             value={bio}
             onChange={(e)=> setBio(e.target.value)}>
             </textarea>
        <p className={bioStyles["count"]}> word count : {count} / 100 </p>
    </section>
    <aside className={bioStyles["save_button"]}>
        <button disabled={count <= 0}> Save </button>
    </aside>
    </div>
</div>
  )
}
