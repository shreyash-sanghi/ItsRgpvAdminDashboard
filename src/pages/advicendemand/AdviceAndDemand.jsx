import React, { useState,useContext,useEffect } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import FileUpload from "../../components/ui/fileUpload";
import { UserContext } from "../../App";

const UserAdvice = () => {

  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Advice and Demand");
  },[])

  const [feedback, setFeedback] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: null,
    branch: "",
    topicOfFeedback: "",
    supportingAttachment: [],
    enrollmentNumber: "",
    descriptionOfFeedback: "",
    passoutYear: null,
    semester: null,
  });

  const handleChange = (field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Data:", feedback);

    // Reset form after submission
    setFeedback({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: null,
      branch: "",
      topicOfFeedback: "",
      supportingAttachment: [],
      enrollmentNumber: "",
      descriptionOfFeedback: "",
      passoutYear: null,
      semester: null,
    });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">User Advice Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <InputField
              id="firstName"
              value={feedback.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <InputField
              id="lastName"
              value={feedback.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <InputField
              id="email"
              type="email"
              value={feedback.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <InputField
              id="contactNumber"
              type="number"
              value={feedback.contactNumber || ""}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              placeholder="Enter contact number"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Branch <span className="text-red-500">*</span>
            </label>
            <InputField
              id="branch"
              value={feedback.branch}
              onChange={(e) => handleChange("branch", e.target.value)}
              placeholder="Enter branch"
              required
            />
          </div>
          <div>
            <label htmlFor="topicOfFeedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic of Feedback <span className="text-red-500">*</span>
            </label>
            <InputField
              id="topicOfFeedback"
              value={feedback.topicOfFeedback}
              onChange={(e) => handleChange("topicOfFeedback", e.target.value)}
              placeholder="Enter feedback topic"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="supportingAttachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Supporting Attachments
          </label>
          <FileUpload
            id="supportingAttachment"
            files={feedback.supportingAttachment}
            onChange={(files) => handleChange("supportingAttachment", files)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label htmlFor="enrollmentNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Enrollment Number <span className="text-red-500">*</span>
            </label>
            <InputField
              id="enrollmentNumber"
              value={feedback.enrollmentNumber}
              onChange={(e) => handleChange("enrollmentNumber", e.target.value)}
              placeholder="Enter enrollment number"
              required
            />
          </div>
          <div>
            <label htmlFor="descriptionOfFeedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description of Feedback <span className="text-red-500">*</span>
            </label>
            <TextArea
              id="descriptionOfFeedback"
              value={feedback.descriptionOfFeedback}
              onChange={(e) => handleChange("descriptionOfFeedback", e.target.value)}
              placeholder="Enter feedback description"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label htmlFor="passoutYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Passout Year
            </label>
            <InputField
              id="passoutYear"
              type="number"
              value={feedback.passoutYear || ""}
              onChange={(e) => handleChange("passoutYear", e.target.value)}
              placeholder="Enter passout year"
            />
          </div>
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Semester
            </label>
            <InputField
              id="semester"
              type="number"
              value={feedback.semester || ""}
              onChange={(e) => handleChange("semester", e.target.value)}
              placeholder="Enter semester"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default UserAdvice;
