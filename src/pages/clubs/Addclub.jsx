import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import AddClub from '../../components/clubs/AddClub';

const AddClubPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Add Club");
  }, []);

  return <AddClub />
}

export default AddClubPage
