import React, { useContext, useEffect } from 'react'
import Roles from "../../components/dynamicOption/roles/index"
import { UserContext } from '../../App';

const Role = () => {

  // title name of header
  const { setSectionName } = useContext(UserContext);
  useEffect(() => {
    setSectionName("Roles");
  }, [])

  return (
    <>
      <Roles />
    </>
  )
}

export default Role;