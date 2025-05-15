import React, { useEffect } from 'react'
import { UserContext } from '../../App';
import { useContext } from 'react';
import AddAdvice from '../../components/advicendemand/AddAdvice';

const AdviceAndDemandPage = () => {
  const { setSectionName } = useContext(UserContext);
  
  useEffect(() => {
    setSectionName("Advice and Demand");
  }, []);

  return <AddAdvice />
}

export default AdviceAndDemandPage
