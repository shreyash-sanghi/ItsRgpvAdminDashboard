import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import FileUpload from "../ui/fileUpload";
import { addDemand } from "../../api/allApi/demand";
import Select from "../ui/select";

const AddAdvice = () => {
  const [feedback, setFeedback] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: "",                  // Note: Use string or number? Schema expects Number.
    topicOfFeedback: "",
    supportAttachment: [], 
    rating: "",                // rating enum as string "1"-"5"
    demandTitle: "",
    description: "",
    progressCount: 1,
    hashtags: [],
    demandStatus: "pending",   // default in schema
    demandRaiseDate: new Date(), 
    demandSubmitted: "",
    submittedTo: "",
    administrationResponse: "",
    demandUpdates: [],
  });

  const handleChange = (field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [field]: value,
    }));
  
    if (field === "supportAttachment") {
      if (value.length > 0) {
        console.log(`Uploaded ${value.length} file(s):`, value.map((file) => file.name));
      } else {
        console.log("No file uploaded");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDemand(feedback);
      if (response.status === 200) {
        alert("Feedback submitted successfully!");
        setFeedback({
          firstName: "",
          lastName: "",
          email: "",
          year: "",
          topicOfFeedback: "",
          supportAttachment: [],
          rating: "",
          demandTitle: "",
          description: "",
          progressCount: 1,
          hashtags: [],
          demandStatus: "pending",
          demandRaiseDate: new Date(),
          demandSubmitted: "",
          submittedTo: "",
          administrationResponse: "",
          demandUpdates: [],
        });
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">User Advice Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            id="firstName"
            value={feedback.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Enter first name"
            required
          />
          <InputField
            label="Last Name"
            id="lastName"
            value={feedback.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Enter last name"
            required
          />
        </div>

        <InputField
          label="Email"
          id="email"
          type="email"
          value={feedback.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter email address"
          required
        />

        <InputField
          label="Year"
          id="year"
          type="number"
          value={feedback.year}
          onChange={(e) => handleChange("year", e.target.value)}
          placeholder="Enter year"
          required
        />

        <InputField
          label="Topic of Feedback"
          id="topicOfFeedback"
          value={feedback.topicOfFeedback}
          onChange={(e) => handleChange("topicOfFeedback", e.target.value)}
          placeholder="Enter feedback topic"
          required
        />

        <FileUpload
          label="Support Attachement"
          id="supportAttachment"
          files={feedback.supportAttachment}
          onChange={(files) => handleChange("supportAttachment", files)}
        />

        <InputField
          label="Rating (1-5)"
          id="rating"
          type="text"
          value={feedback.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          placeholder="Enter rating (1 to 5)"
          required={false}
        />

        <InputField
          label="Demand Title"
          id="demandTitle"
          value={feedback.demandTitle}
          onChange={(e) => handleChange("demandTitle", e.target.value)}
          placeholder="Enter demand title"
          required={false}
        />

        <TextArea
          label="Description"
          id="description"
          value={feedback.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter description"
          rows={4}
          required
        />

        <InputField
          label="Progress Count"
          id="progressCount"
          type="number"
          value={feedback.progressCount}
          onChange={(e) => handleChange("progressCount", e.target.value)}
          min={1}
          max={100}
          required
        />

        <InputField
          label="Hashtags (comma separated)"
          id="hashtags"
          value={feedback.hashtags.join(", ")}
          onChange={(e) =>
            handleChange("hashtags", e.target.value.split(",").map((tag) => tag.trim()))
          }
          placeholder="Enter hashtags separated by commas"
          required={false}
        />

{/* dropdonw with enum */}
<Select
            id="demandStatus"
            label="Demand Status"
            value={department.departmentName}
            onChange={(e) => handleChange("demandStatus", e.target.value)}
            options={[
              "approved",
              "denied",
              "pending",
            ]}
            placeholder="Demand Status"
            required
          />

        {/* demand raise date */}

        <InputField
          label="Demand Submitted"
          id="demandSubmitted"
          value={feedback.demandSubmitted}
          onChange={(e) => handleChange("demandSubmitted", e.target.value)}
          placeholder="Enter demand submitted info"
          required={false}
        />

        <InputField
          label="Submitted To"
          id="submittedTo"
          value={feedback.submittedTo}
          onChange={(e) => handleChange("submittedTo", e.target.value)}
          placeholder="Enter submitted to"
          required={false}
        />

        <TextArea
          label="Administration Response"
          id="administrationResponse"
          value={feedback.administrationResponse}
          onChange={(e) => handleChange("administrationResponse", e.target.value)}
          placeholder="Enter administration response"
          rows={3}
          required={false}
        />

        <InputField
          label="Demand Updates (comma separated)"
          id="demandUpdates"
          value={feedback.demandUpdates.join(", ")}
          onChange={(e) =>
            handleChange("demandUpdates", e.target.value.split(",").map((update) => update.trim()))
          }
          placeholder="Enter demand updates separated by commas"
          required={false}
        />

        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddAdvice;