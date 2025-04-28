import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App';

function AddReelsAndVideo() {

    const {setSectionName} = useContext(UserContext);
    useEffect(()=>{
        setSectionName("Add Reels and Videos")
    },[])
  return (
    <div>AddReelsAndVideo</div>
  )
}

export default AddReelsAndVideo;