import React,{useEffect} from 'react'
import { getAllPyq } from '../../api/api';

const Pyq = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPyq();
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
    <div>Pyq</div>
  )
}

export default Pyq