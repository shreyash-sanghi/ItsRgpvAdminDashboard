import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Pyqs from "../../components/pyqs/Pyqs.jsx";

const PyqPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("PYQ's");
  }, []);

  return <Pyqs />;
};

export default PyqPage;
