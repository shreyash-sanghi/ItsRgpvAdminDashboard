import React,{useEffect} from 'react'
import { getAllPlacements } from '../../api/api';
import { UserContext } from '../../App';
import {useContext} from 'react'

const Placement = () => { 

   // section name to header
   const {setSectionName} = useContext(UserContext);
   useEffect(()=>{
     setSectionName("All Placement Data");
   },[])


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
