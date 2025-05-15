import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Users from "../../components/users/users";

const UsersPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Users");
  }, [setSectionName]);

  return <Users />;
};

export default UsersPage;