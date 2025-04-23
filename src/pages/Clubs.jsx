import React,{useEffect} from 'react'
import { getAllClubs } from '../api/api';


const Clubs = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllClubs();
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
    <div>Clubs</div>
  )
}

export default Clubs