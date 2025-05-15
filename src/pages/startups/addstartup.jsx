import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddStartup from "../../components/startups/AddStartup";

const AddStartupPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Startup");
  }, [setSectionName]);

  return <AddStartup />;
};

export default AddStartupPage; 