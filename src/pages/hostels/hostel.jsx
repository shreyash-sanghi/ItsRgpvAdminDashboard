import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import Hostels from "../../components/hostels/Hostels";

const HostelPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Hostels");
  }, []);

  return <Hostels />;
};

export default HostelPage;