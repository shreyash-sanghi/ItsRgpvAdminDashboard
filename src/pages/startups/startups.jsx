import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Startups from "../../components/startups/Startups";

const StartupsPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Startups");
  }, [setSectionName]);

  return <Startups />;
};

export default StartupsPage;