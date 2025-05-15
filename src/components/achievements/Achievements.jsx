import React, { useEffect, useState } from 'react'
import { getAllachievements } from '../../api/allApi/achivement'

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllachievements();
      console.log(response?.data?.data);
      setAchievements(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
     <h1>all achievements</h1>
  )
}

export default Achievements
