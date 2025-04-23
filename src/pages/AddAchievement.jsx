import React, { useState } from "react";
import Button from "../components/ui/button";
import InputField from "../components/ui/input";
import TextArea from "../components/ui/textarea";
import Select from "../components/ui/select";
import { addAchievement } from "../api/api";

const AddAchievement = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Achievement Data:", achievement);

    try {
      const response = await addAchievement(achievement);
      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Achievement added successfully!");
      } else {
        console.log("Error:", response.data);
        alert("Failed to add achievement.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }

    setAchievement({
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
  };

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
          <InputField
            id="achievementDate"
            label="Achievement Date"
            type="date"
            value={achievement.achievementDate}
            onChange={(e) => handleChange("achievementDate", e.target.value)}
            required
          />
          <InputField
            id="semester"
            label="Semester"
            type="number"
            placeholder="Enter semester"
            value={achievement.semester}
            onChange={(e) => handleChange("semester", e.target.value)}
            required
          />
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
        <InputField
          id="photos"
          label="Photo URL"
          placeholder="Enter photo URL"
          value={achievement.photos}
          onChange={(e) => handleChange("photos", e.target.value)}
        />

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
