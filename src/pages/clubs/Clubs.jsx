import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import Clubs from '../../components/clubs/Clubs';

const ClubsPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Clubs");
  }, []);

  return <Clubs />
}

export default ClubsPage