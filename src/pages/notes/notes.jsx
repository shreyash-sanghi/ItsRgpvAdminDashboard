import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import Notes from '../../components/notes/Notes';

const NotesPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Notes");
  }, []);

  return <Notes />;
};

export default NotesPage;