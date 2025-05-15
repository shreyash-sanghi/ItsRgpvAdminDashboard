import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Fests from "../../components/fests/Fests";

const FestsPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Fests");
  }, []);

  return <Fests />;
};

export default FestsPage;