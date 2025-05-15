import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import AddNotes from '../../components/notes/AddNotes';

const AddNotesPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
     setSectionName("Add Notes");
  }, []);

  return <AddNotes />;
};

export default AddNotesPage;
