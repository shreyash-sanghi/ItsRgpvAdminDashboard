import React,{useEffect} from 'react'
import { getAllDepartments } from '../api/api';

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