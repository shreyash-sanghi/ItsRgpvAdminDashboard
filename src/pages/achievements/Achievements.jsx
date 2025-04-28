import React, { useEffect } from 'react'
import { getAllachievements } from '../../api/api'
import { UserContext } from '../../App'
import { useContext } from 'react'

const Achievements = () => {
  
  const { setSectionName } = useContext(UserContext);
  useEffect(() => {
    setSectionName("Achievements");
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllachievements();
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
    <div>Achievements</div>
  )
}

export default Achievements