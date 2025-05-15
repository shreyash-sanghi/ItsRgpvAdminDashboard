import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Pyqs from "../../components/pyqs/PYQs";

const PyqPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("PYQ's");
  }, []);

  return <Pyqs />;
};

export default PyqPage;