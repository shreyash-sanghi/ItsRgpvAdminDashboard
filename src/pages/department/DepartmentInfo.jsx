import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import DepartmentInfo from '../../components/department/DepartmentInfo'

const addDepartmentInfoPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Add Department Info");
  }, []);

  return <DepartmentInfo />
}

export default addDepartmentInfoPage;


