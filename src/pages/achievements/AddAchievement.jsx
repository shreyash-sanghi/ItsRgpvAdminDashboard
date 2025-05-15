import React, { useEffect } from "react";
import AddAchievement from "../../components/achievements/AddAchievements";
import { UserContext } from "../../App";
import { useContext } from "react";

const AddAchievementPage = () => {
  const { setSectionName } = useContext(UserContext);

  useEffect(() => {
    setSectionName("Add Achievement");
  }, []);
  
  return <AddAchievement />;
};

export default AddAchievementPage;
