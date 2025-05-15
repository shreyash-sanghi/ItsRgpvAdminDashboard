import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import Events from '../../components/events/Events';

const EventsPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Events");
  }, []);

  return <Events />
}

export default EventsPage