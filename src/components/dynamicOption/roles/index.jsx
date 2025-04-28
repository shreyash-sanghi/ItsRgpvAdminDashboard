import React, { useState,useEffect } from "react";
import Button from "../../ui/button";
import InputField from "../../ui/input";
import { addRoles } from "../../../api/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { UserContext } from "../../../App";
import { useContext } from "react";

const AddEvent = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Add Event");
  },[])
  const [event, setEvent] = useState({
    roleName: "",
    secretKey: "",
  });

  const handleChange = (field, value) => {
    setEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const encodeData = (data) => {
    return btoa(JSON.stringify(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       const encodedEvent = encodeData(event);
    console.log("Encoded Event Data:", encodedEvent);

    const response = await addRoles({ data: encodedEvent });
    if (response.status === 200) {
      alert("Success...")
      console.log("Response Data:", response);
    } else {
      alert("Error ",response.data.message)
      console.log("Error:", response);
    }
  };

  const rolesData = [
    { role: "Admin", createdDate: "2024-01-15" },
    { role: "Editor", createdDate: "2024-02-10" },
    { role: "User", createdDate: "2024-03-05" },
    { role: "Moderator", createdDate: "2024-04-20" }
  ];

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Role Form</h2>

        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Event Details</h3>
          <div className="space-y-5 gap-6">
            <div>
              <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="roleName"
                value={event.roleName}
                onChange={(e) => handleChange("roleName", e.target.value)}
                placeholder="Enter role name"
                required
              />
            </div>
            <div>
              <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Key Code <span className="text-red-500">*</span>
              </label>
              <InputField
                id="secretKey"
                value={event.secretKey}
                onChange={(e) => handleChange("secretKey", e.target.value)}
                placeholder="Enter secret key..."
                required
              />
            </div>
          </div>
        </section>
        {/* Submit Button */}
        <div className="text-center">
          <Button label="Submit" />
        </div>
      </form>
      <hr className="my-3" />
      <section>
        <div className="flex gap-5 flex-wrap">
        {rolesData.map((info)=>(
     <div className="max-w-sm mx-auto gap-5 bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
     <div>
       <h2 className="text-xl font-semibold text-gray-700">{info.role}</h2>
       <p className="text-gray-500 text-sm">Created Date: {info.createdDate}</p>
     </div>
     <div className="flex space-x-2">
       <button className="text-blue-500 hover:text-blue-700">
         <FaEdit />
       </button>
       <button className="text-red-500 hover:text-red-700">
         <FaTrash />
       </button>
     </div>
   </div>
        ))}
        </div>
      </section>
    </div>
  );
};

export default AddEvent;
