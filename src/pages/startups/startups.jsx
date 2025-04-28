import React, { useEffect } from 'react'
import { getAllStartups } from '../../api/api';
import { UserContext } from '../../App';
import { useContext } from 'react';

const Startups = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Startups");
  },[])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllStartups();
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
    <div>Startups</div>
  )
}

export default Startups