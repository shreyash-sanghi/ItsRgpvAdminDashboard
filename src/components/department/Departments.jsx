import React,{useEffect} from 'react'
import { getAllDepartments } from '../../api/allApi/department.js';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Departments = () => {

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDepartments();
      if (response.status === 200) {
        console.log(response.data)
      }
      else {
        console.log("Error", response);
      }
    }
    fetchData()
  }, []);

  return (
    <div>Departments</div>
  )
}

export default Departments