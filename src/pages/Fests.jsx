import React,{useEffect} from 'react'
import { getAllFests } from '../api/api';

const Fests = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllFests();
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
    <div>Fests</div>
  )
}

export default Fests