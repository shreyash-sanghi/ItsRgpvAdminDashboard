import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import FileUpload from "../../components/ui/fileUpload";
import { addDepartment } from "../../api/api";
import { UserContext } from "../../App";

const DepartmentInfo = () => {

  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Department Info")
  },[])

  const [department, setDepartment] = useState({
    departmentName: "",
    descriptionOfDepartment: "",
    headOfDepartment: "",
    totalSeats: null,
    yearOfEshtalishment: null,
    contactEmail: "",
    departmentImages: [],
    contactPhone: null,
  });

  const handleChange = (field, value) => {
    setDepartment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await addDepartment(department);
    if (response.status === 200) {
      console.log("Department Data:", response);
    }
    else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setDepartment({
    //   departmentName: "",
    //   descriptionOfDepartment: "",
    //   headOfDepartment: "",
    //   totalSeats: null,
    //   yearOfEstablishment: null,
    //   contactEmail: "",
    //   departmentImages: [],
    //   contactPhone: null,
    // });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Department Information Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <InputField
              id="departmentName"
              value={department.departmentName}
              onChange={(e) => handleChange("departmentName", e.target.value)}
              placeholder="Enter department name"
              required
            />
          </div>
          <div>
            <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Head of Department <span className="text-red-500">*</span>
            </label>
            <InputField
              id="headOfDepartment"
              value={department.headOfDepartment}
              onChange={(e) => handleChange("headOfDepartment", e.target.value)}
              placeholder="Enter head of department name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Seats <span className="text-red-500">*</span>
            </label>
            <InputField
              id="totalSeats"
              type="number"
              value={department.totalSeats || ""}
              onChange={(e) => handleChange("totalSeats", e.target.value)}
              placeholder="Enter total number of seats"
              required
            />
          </div>
          <div>
            <label htmlFor="yearOfEshtalishment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Year of Establishment <span className="text-red-500">*</span>
            </label>
            <InputField
              id="yearOfEshtalishment"
              type="number"
              value={department.yearOfEshtalishment || ""}
              onChange={(e) => handleChange("yearOfEshtalishment", e.target.value)}
              placeholder="Enter year of establishment"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <InputField
              id="contactEmail"
              type="email"
              value={department.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              placeholder="Enter contact email"
              required
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Phone <span className="text-red-500">*</span>
            </label>
            <InputField
              id="contactPhone"
              type="number"
              value={department.contactPhone || ""}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="Enter contact phone number"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="departmentImages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Department Images
          </label>
          <FileUpload
            id="departmentImages"
            files={department.departmentImages}
            onChange={(files) => handleChange("departmentImages", files)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="descriptionOfDepartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description of Department <span className="text-red-500">*</span>
          </label>
          <InputField
            id="descriptionOfDepartment"
            value={department.descriptionOfDepartment}
            onChange={(e) => handleChange("descriptionOfDepartment", e.target.value)}
            placeholder="Enter description of department"
            required
          />
        </div>

        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default DepartmentInfo;

