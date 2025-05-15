import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Placements from "../../components/placements/Placements";

const PlacementPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("All Placement Data");
  }, []);

  return <Placements />;
};

export default PlacementPage;
