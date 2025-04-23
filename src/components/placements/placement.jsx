import React,{useEffect} from 'react'
import { getAllPlacements } from '../../api/api';

const Placement = () => { 
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPlacements();
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
    <div>
      Placements
    </div>
  )
}

export default Placement
