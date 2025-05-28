import React, { useContext, useState, useEffect } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import { addPlacement, editPlacementAPI } from "../../api/allApi/placement";
import FileUpload from "../ui/fileUpload";
import Select from "../ui/select";
import { showSuccessToast, showErrorToast } from "../ui/toast";
import { UserContext } from "../../App";

const AddPlacement = ({ editPlacement = false, AllPlacementData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [placementData, setPlacementData] = useState({
    studentFirstName: "",
    studentLastName: "",
    email: "",
    contactNumber: "",
    profilePicture: null,
    skills: [],
    enrollmentNumber: "",
    company: "",
    passoutYear: 0,
    semester: 0,
    salaryPackage: 0,
  });

  useEffect(() => {
    setSectionName(editPlacement ? "Edit Placement" : "Add Placement");

    if (editPlacement && AllPlacementData) {
      setPlacementData({
        ...AllPlacementData,
        profilePicture: null, // reset file input
      });
    }
  }, [editPlacement, AllPlacementData, setSectionName]);

  const handleChange = (field, value) => {
    setPlacementData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    setPlacementData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      // Helper to check shallow equality
      const isEqual = (key, val1, val2) => {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          return JSON.stringify(val1) === JSON.stringify(val2);
        }
        return val1 === val2;
      };

      if (editPlacement) {
        for (const [key, value] of Object.entries(placementData)) {
          const originalValue = AllPlacementData[key];
      
          if (key === "profilePicture") {
            if (value instanceof File) {
              formData.append("profilePicture", value); // new file uploaded
            }
            // Do not send anything if no file was uploaded
          } else if (!isEqual(key, value, originalValue)) {
            formData.append(key, value);
          }
        }
      
        // Send the image URL if it was not replaced
        if (!placementData.profilePicture && placementData.existingImage) {
          formData.append("existingImage", placementData.existingImage);
        }
      
        formData.append("formType", "placement");
        await editPlacementAPI(AllPlacementData._id, formData);
        showSuccessToast("Placement edited successfully");
        setIsEditing(false);
      }
      
      else {
        // New Placement
        for (const [key, value] of Object.entries(placementData)) {
          if (key === "profilePicture" && value) {
            formData.append("profilePicture", value);
          } else {
            formData.append(key, value);
          }
        }
        formData.append("formType", "placement");
        await addPlacement(formData);
        showSuccessToast("Placement added successfully");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      showErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Placement Data
        </h2>

        {/* Student Information Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="studentFirstName"
              label="First Name"
              value={placementData.studentFirstName}
              onChange={(e) => handleChange("studentFirstName", e.target.value)}
              placeholder="Enter first name"
              required
            />
            <InputField
              id="studentLastName"
              label="Last Name"
              value={placementData.studentLastName}
              onChange={(e) => handleChange("studentLastName", e.target.value)}
              placeholder="Enter last name"
              required
            />
            <InputField
              id="email"
              label="Email"
              value={placementData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email"
              required
            />
            <InputField
              id="contactNumber"
              label="Contact Number"
              type="number"
              value={placementData.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              placeholder="Enter contact number"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profile Picture
            </label>
            <FileUpload
              id="profilePicture"
              files={placementData.profilePicture}
              onChange={(files) => handleFileUpload("profilePicture", files)}
            />
          </div>
        </section>

        {/* Placement Information Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Placement Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="enrollmentNumber"
              label="Enrollment Number"
              value={placementData.enrollmentNumber}
              onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
              placeholder="Enter enrollment number"
              required
            />
            <InputField
              id="company"
              label="Company"
              value={placementData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Enter company name"
              required
            />
            <InputField
              id="passoutYear"
              label="Passout Year"
              type="number"
              value={placementData.passoutYear}
              onChange={(e) => handleChange("passoutYear", e.target.value)}
              placeholder="Enter passout year"
              required
            />
            <InputField
              id="package"
              label="Package (in LPA)"
              type="number"
              value={placementData.salaryPackage}
              onChange={(e) => handleChange("salaryPackage", e.target.value)}
              placeholder="Enter offered package"
              required
            />
            <Select
              id="semester"
              label="Semester"
              value={placementData.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              options={[1, 2, 3, 4, 5, 6, 7, 8]}
              placeholder="Select semester"
              required
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button type="submit" loading={loading} label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddPlacement;