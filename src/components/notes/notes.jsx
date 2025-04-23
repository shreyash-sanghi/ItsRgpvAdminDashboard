import React,{useEffect} from 'react'
import { getAllNotes } from '../../api/api';

const Notes = () => {
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