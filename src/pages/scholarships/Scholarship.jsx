import React,{useEffect} from 'react'
import { getAllScholarships } from '../../api/api';
import { UserContext } from '../../App';
import { useContext } from 'react';


const Scholership = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Scholarships");
  },[])

  
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