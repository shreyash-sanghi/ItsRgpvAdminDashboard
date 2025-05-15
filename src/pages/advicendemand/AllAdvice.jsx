import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import AllAdvice from '../../components/advicendemand/AllAdvice';

const AllAdvicePage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("All Advice");
  }, []);

  return <AllAdvice />
}

export default AllAdvicePage