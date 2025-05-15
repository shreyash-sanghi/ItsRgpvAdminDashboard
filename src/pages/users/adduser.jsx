import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddUser from "../../components/users/AddUser";

const AddUserPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add User");
  }, [setSectionName]);

  return <AddUser />;
};

export default AddUserPage;
