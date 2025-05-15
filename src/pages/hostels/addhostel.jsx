import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddHostel from "../../components/hostels/AddHostel";

const AddHostelPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Hostel");
  }, []);

  return <AddHostel />;
};

export default AddHostelPage;
