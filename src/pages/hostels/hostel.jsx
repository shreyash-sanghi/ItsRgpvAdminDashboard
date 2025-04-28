import React, {useEffect}from 'react'
import { getAllHostelInfo } from '../../api/api';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Hostel = () => {

  // section name to header
  const {setSectionName} = useContext(UserContext);

  useEffect(()=>{
    setSectionName("Hostels")
  },[]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await getAllHostelInfo();
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
    <div>hostel</div>
  )
}

export default Hostel;