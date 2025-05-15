import React, { useEffect, useContext } from "react";
import { UserContext } from "../../App";
import ReelsAndVideos from "../../components/reelsnvideos/ReelsAndVideos";

const ReelsAndVideoPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Reels and Videos");
  }, []);

  return <ReelsAndVideos />;
};

export default ReelsAndVideoPage;