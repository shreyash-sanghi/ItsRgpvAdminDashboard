import React, { useEffect } from 'react'
import { getAllachievements } from '../../api/allApi/achivement'
import { UserContext } from '../../App'
import { useContext } from 'react'

const Achievements = () => {
  
  const { setSectionName } = useContext(UserContext);
  useEffect(() => {
    setSectionName("Achievements");
  },[]);

  const fetchData = async () => {
      try{
    const response = await getAllachievements();
    console.log(response?.data?.data)
      }catch(error){
alert(error);
      }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>Achievements</div>
  )
}

export default Achievements