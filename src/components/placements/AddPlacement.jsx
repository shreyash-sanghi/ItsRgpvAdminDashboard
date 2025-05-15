import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import { addPlacement } from "../../api/allApi/placement";
import FileUpload from "../ui/fileUpload";

const AddPlacement = () => {
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
      const formData = new FormData();

      // Append fields to formData
      formData.append("studentFirstName", placementData.studentFirstName);
      formData.append("studentLastName", placementData.studentLastName);
      formData.append("email", placementData.email);
      formData.append("contactNumber", placementData.contactNumber);
      formData.append("enrollmentNumber", placementData.enrollmentNumber);
      formData.append("company", placementData.company);
      formData.append("passoutYear", placementData.passoutYear);
      formData.append("semester", placementData.semester);
      formData.append("salaryPackage", placementData.salaryPackage);
      formData.append("formType", "placement");

      // Append skills as JSON string
      formData.append("skills", JSON.stringify(placementData.skills));

      // Append profile picture if exists
      if (placementData.profilePicture) {
        formData.append("profilePicture", placementData.profilePicture);
      }

      // API call
      const response = await addPlacement(formData);
      if (response.status === 200) {
        console.log("Placement added successfully:", response);
        // Reset form
        setPlacementData({
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
          package: 0,
        });
      } else {
        console.error("Error adding placement:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
            <select
              id="semester"
              value={placementData.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
              required
            >
              <option value="">Select semester</option>
                <option value="1">I</option>
                <option value="2">II</option>
                <option value="3">III</option>
                <option value="4">IV</option>
                <option value="5">V</option>
                <option value="6">VI</option>
                <option value="7">VII</option>
                <option value="8">VIII</option>
            </select>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddPlacement;