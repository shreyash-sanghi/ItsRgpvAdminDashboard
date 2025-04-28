// import React from 'react'
// import DepatmentPhoto from '../partials/departmental/DepartmentPhoto'


//   return (
//     <div>
//       <DepatmentPhoto/>
//     </div>
//   );


// export default DepartmentImage

import {React,useEffect} from 'react'
import DepartmentPhoto from '../../partials/departmental/DepartmentPhoto'
import { UserContext } from '../../App';
import { useContext } from 'react';

const DepartmentImage = () => {
  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Department Image")
  },[])

  return (
    <div>
      <DepartmentPhoto/>
    </div>
  )
}

export default DepartmentImage;
