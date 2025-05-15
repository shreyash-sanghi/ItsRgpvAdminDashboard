import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Scholarships from "../../components/scholarships/Scholarships";

const ScholarshipPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Scholarships");
  }, []);

  return <Scholarships />;
};

export default ScholarshipPage;