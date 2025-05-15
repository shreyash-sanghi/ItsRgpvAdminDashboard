import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddFest from "../../components/fests/AddFest";

const AddFestPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Fest");
  }, []);

  return <AddFest />;
};

export default AddFestPage;
