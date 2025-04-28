import React, { useState, useContext } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import { addPlacement } from "../../api/api";
import { useEffect } from "react";
import { UserContext } from "../../App";

const AddPlacement = () => {

   // section name to header
   const {setSectionName} = useContext(UserContext);
   useEffect(()=>{
     setSectionName("Add Placement Data");
   },[])


  const [placementData, setPlacementData] = useState({
    studentFirstName: "",
    studentLastName: "",
    email: "",
    contactNumber: "",
    profilePicture: null, // updated to store file object
    skills: [],
    enrollmentNumber: "",
    company: "",
    passoutYear: 0,
    semester: 0,
  });

  const handleChange = (field, value) => {
    setPlacementData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the file
    setPlacementData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Placement Data:", placementData);


    const response = await addPlacement(placementData);

    if (response.status === 200) {
      console.log("Placement Data:", response);
    } else {
      console.log("Error:", response);
      
    }

    // Reset form after submission
    // setPlacementData({
    //   studentFirstName: "",
    //   studentLastName: "",
    //   email: "",
    //   contactNumber: "",
    //   profilePicture: null,
    //   skills: [],
    //   enrollmentNumber: "",
    //   company: "",
    //   passoutYear: 0,
    //   semester: 0,
    // });
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
            <div>
              <label
                htmlFor="studentFirstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="studentFirstName"
                value={placementData.studentFirstName}
                onChange={(e) => handleChange("studentFirstName", e.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="studentLastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="studentLastName"
                value={placementData.studentLastName}
                onChange={(e) => handleChange("studentLastName", e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <InputField
                id="email"
                value={placementData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Contact Number <span className="text-red-500">*</span>
              </label>
              <InputField
                id="contactNumber"
                value={placementData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Profile Picture <span className="text-red-500">*</span>
            </label>
            <input
              id="profilePicture"
              type="file"
              onChange={handleFileChange} // handle file selection
              accept="image/*" // restrict to image files
              // required
            />
          </div>
        </section>

        {/* Placement Information Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Placement Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="enrollmentNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Enrollment Number <span className="text-red-500">*</span>
              </label>
              <InputField
                id="enrollmentNumber"
                value={placementData.enrollmentNumber}
                onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
                placeholder="Enter enrollment number"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <InputField
                id="company"
                value={placementData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="passoutYear"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Passout Year <span className="text-red-500">*</span>
              </label>
              <InputField
                id="passoutYear"
                type="number"
                value={placementData.passoutYear}
                onChange={(e) => handleChange("passoutYear", e.target.value)}
                placeholder="Enter passout year"
                required
              />
            </div>
            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Semester <span className="text-red-500">*</span>
              </label>
              <InputField
                id="semester"
                type="number"
                value={placementData.semester}
                onChange={(e) => handleChange("semester", e.target.value)}
                placeholder="Enter semester"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Skills
            </label>
            <TextArea
              id="skills"
              value={placementData.skills.join(", ")}
              onChange={(e) => handleChange("skills", e.target.value.split(",").map((skill) => skill.trim()))}
              placeholder="Enter skills (comma-separated)"
              rows={3}
            />
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
