import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import Select from "../ui/select";
import { useContext } from "react";
import { UserContext } from "../../App";
import { addAchievement } from "../../api/allApi/achivement.js";
import FileUpload from "../ui/fileUpload.jsx";


const AddAchievement = () => {

  const { setSectionName } = useContext(UserContext); //  get section name

  const [achievement, setAchievement] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Year: "",
    achievementDate: "",
    branch: "",
    fieldOfAchievement: [""],
    enrollmentNumber: "",
    department: "",
    achievementTitle: "",
    semester: "",
    achievementDescription: "",
    recognitionLevel: "",
    awards: "",
    photos: "",
    socialMediaLinks: [""],
  });

  const [tempLinks, setTempLinks] = useState(achievement.socialMediaLinks.join(" "));

  const handleChange = (field, value) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value, index) => {
    setAchievement((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleAddField = (field) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveField = (field, index) => {
    setAchievement((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  // upload of image
  const handleFileUpload = (field, file) => {
    setAchievement((prev) => ({
      ...prev,
      [field]: file,  // Directly assign the file instead of an array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
  
      // Append each field manually
      formData.append("firstName", achievement.firstName);
      formData.append("lastName", achievement.lastName);
      formData.append("email", achievement.email);
      formData.append("Year", achievement.Year);
      formData.append("achievementDate", achievement.achievementDate);
      formData.append("branch", achievement.branch);
      formData.append("enrollmentNumber", achievement.enrollmentNumber);
      formData.append("department", achievement.department);
      formData.append("achievementTitle", achievement.achievementTitle);
      formData.append("semester", achievement.semester);
      formData.append("achievementDescription", achievement.achievementDescription);
      formData.append("recognitionLevel", achievement.recognitionLevel);
      formData.append("awards", achievement.awards);
  
      // Append the file manually (ensure it's a File object)
      if (achievement.photos) {
        formData.append("photos", achievement.photos); // Use the field name as 'photos'
      }
  
      // Append array fields
      achievement.fieldOfAchievement.forEach((field, index) => {
        formData.append(`fieldOfAchievement[${index}]`, field);
      });
  
      achievement.socialMediaLinks.forEach((link, index) => {
        formData.append(`socialMediaLinks[${index}]`, link);
      });
  
      // Log FormData to verify
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await addAchievement(formData);
      console.log("Response from server:", response);
      alert("Achievement added successfully!");
    } catch (error) {
      console.error("Error during submission: ", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    setSectionName("Add Achievement");
  },[]);
  
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Achievement
        </h2>

        {/* Inline Fields Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="Enter first name"
            value={achievement.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Enter last name"
            value={achievement.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter email"
            value={achievement.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <InputField
            id="enrollmentNumber"
            label="Enrollment Number"
            placeholder="Enter enrollment number"
            value={achievement.enrollmentNumber}
            onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
            required
          />
          <InputField
            id="branch"
            label="Branch"
            placeholder="Enter branch"
            value={achievement.branch}
            onChange={(e) => handleChange("branch", e.target.value)}
          />
          <InputField
            id="department"
            label="Department"
            placeholder="Enter department"
            value={achievement.department}
            onChange={(e) => handleChange("department", e.target.value)}
            required
          />
          <InputField
            id="achievementTitle"
            label="Achievement Title"
            placeholder="Enter achievement title"
            value={achievement.achievementTitle}
            onChange={(e) => handleChange("achievementTitle", e.target.value)}
            required
          />
          <InputField
            id="Year"
            label="Year of Achievement"
            type="number"
            placeholder="Enter year"
            value={achievement.Year}
            onChange={(e) => handleChange("Year", e.target.value)}
            required
          />
          <div>
            <label htmlFor="achievementDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Achievement Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="achievementDate"
              value={achievement.achievementDate}
              onChange={(e) => handleChange("achievementDate", e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              id="semester"
              value={achievement.semester}
              onChange={(e) => handleChange("semester", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
        </div>

        {/* Description and Other Details */}
        <TextArea
          id="achievementDescription"
          label="Achievement Description"
          placeholder="Enter achievement description"
          value={achievement.achievementDescription}
          onChange={(e) => handleChange("achievementDescription", e.target.value)}
        />
        <Select
          id="recognitionLevel"
          label="Recognition Level"
          value={achievement.recognitionLevel}
          onChange={(e) => handleChange("recognitionLevel", e.target.value)}
          options={["gold level", "silver level", "bronze level"]}
        />
        <InputField
          id="awards"
          label="Awards"
          placeholder="Enter awards received"
          value={achievement.awards}
          onChange={(e) => handleChange("awards", e.target.value)}
        />
        <label htmlFor="">
          Achievment images
       
        <FileUpload
                id="photos"
                files={achievement.photos}
                onChange={(files) => handleFileUpload("photos", files)}
        />
      </label>
        {/* Fields of Achievement */}
        <div>
          <label htmlFor="fieldOfAchievement" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fields of Achievement
          </label>
          {achievement.fieldOfAchievement.map((field, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <InputField
                id={`fieldOfAchievement-${index}`}
                value={field}
                onChange={(e) => handleArrayChange("fieldOfAchievement", e.target.value, index)}
                placeholder="Enter field"
              />
              <Button label="Remove" onClick={() => handleRemoveField("fieldOfAchievement", index)} />
            </div>
          ))}
          <Button label="Add Field" onClick={() => handleAddField("fieldOfAchievement")} />
        </div>

        {/* Social Media Links */}
        <div>
          <label
            htmlFor="socialMediaLinks"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Social Media Links (separate by spaces)
          </label>
          <InputField
            id="socialMediaLinks"
            value={tempLinks} // Use a temporary string state for user input
            onChange={(e) => setTempLinks(e.target.value)} // Update the temp value on input
            onBlur={() =>
              handleChange(
                "socialMediaLinks",
                tempLinks
                  .split(" ")
                  .filter((link) => link.trim() !== "") // Process input on blur
              )
            }
            placeholder="Enter links separated by spaces"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddAchievement;