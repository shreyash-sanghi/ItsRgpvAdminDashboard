import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import Departments from '../../components/department/Departments'

const DepartmentPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("All Departments");
  }, []);

  return <Departments />
}

export default DepartmentPage;
