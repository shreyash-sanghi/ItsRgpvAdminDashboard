import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddPlacement from "../../components/placements/AddPlacement";

const AddPlacementPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Placement Data");
  }, []);

  return <AddPlacement />;
};

export default AddPlacementPage;
