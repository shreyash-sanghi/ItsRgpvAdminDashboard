import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddScholarship from "../../components/scholarships/AddScholarship";

const AddScholarshipsPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Scholarship");
  }, []);

  return <AddScholarship />;
};

export default AddScholarshipsPage;