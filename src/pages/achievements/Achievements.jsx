import React, { useEffect } from 'react'
import { UserContext } from '../../App'
import { useContext } from 'react'
import Achievements from '../../components/achievements/Achievements'

const AchievementsPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Achievements");
  }, []);

  return <Achievements />
}

export default AchievementsPage