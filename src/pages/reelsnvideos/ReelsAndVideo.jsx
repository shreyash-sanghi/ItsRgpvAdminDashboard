import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App';

const ReelsAndVideo = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Reels and Video");
  },[])


  return (
    <div>Reels And Video</div>
  )
}

export default ReelsAndVideo;