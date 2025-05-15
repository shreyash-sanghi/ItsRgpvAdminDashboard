import React, { useContext, useEffect, useState } from "react";
import AddEvent from "../../components/events/AddEvent";
import { UserContext } from "../../App";

const AddEventPage = () => {

  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Add Event");
  },[])

  return (
    <div>
      <AddEvent />
    </div>
  )
};

export default AddEventPage;
