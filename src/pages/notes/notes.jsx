import React,{useEffect} from 'react'
import { getAllNotes } from '../../api/api';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Notes = () => {

   // section name to header
   const {setSectionName} = useContext(UserContext);
   useEffect(()=>{
     setSectionName("Notes");
   },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllNotes();
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
    <div>Notes</div>
  )
}

export default Notes