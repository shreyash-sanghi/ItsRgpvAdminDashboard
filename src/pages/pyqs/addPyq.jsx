import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddPyq from "../../components/pyqs/AddPyq";

const AddPyqPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add PYQ's");
  }, []);

  return <AddPyq />;
};

export default AddPyqPage;
