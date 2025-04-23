import React,{useEffect} from 'react'
import { getAllScholarships } from '../../api/api';


const Scholership = () => {
    useEffect(() => {
        const fetchData = async () => {
        const response = await getAllScholarships();
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
    <div>scholership</div>
  )
}

export default Scholership