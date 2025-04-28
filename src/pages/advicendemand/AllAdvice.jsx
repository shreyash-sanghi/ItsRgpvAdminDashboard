import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../App';

function AllAdvice() {

    const {setSectionName} = useContext(UserContext);
    useEffect(()=>{
        setSectionName("All Advice");
    },[])

  return (
    <div>All Advice</div>
  )
}

export default AllAdvice;