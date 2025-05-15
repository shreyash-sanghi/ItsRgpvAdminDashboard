import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AddReelsAndVideos from "../../components/reelsnvideos/AddReelsAndVideos";

const AddReelsAndVideoPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Reels and Videos");
  }, []);

  return <AddReelsAndVideos />;
};

export default AddReelsAndVideoPage;