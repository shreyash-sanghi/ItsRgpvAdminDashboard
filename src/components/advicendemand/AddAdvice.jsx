import React, { useState, useContext, useEffect } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import FileUpload from "../ui/fileUpload";
import { addDemand, editDemandAPI } from "../../api/allApi/demand";
import Select from "../ui/select";
import { UserContext } from "../../App";
import { showSuccessToast, showErrorToast } from "../ui/toast"; // Make sure this path is correct

const AddAdvice = ({ editAddAdvice = false, AddAdviceData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState({
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
    demandRaiseDate: new Date().toISOString().split("T")[0],
    demandSubmitted: "",
    submittedTo: "",
    administrationResponse: "",
    demandUpdates: [],
  });

  useEffect(() => {
    setSectionName(editAddAdvice ? "Edit Advice" : "Add Advice");

    if (editAddAdvice && AddAdviceData) {
      const formattedDate = AddAdviceData.demandRaiseDate?.split("T")[0] || "";
      setFeedback({
        ...AddAdviceData,
        demandRaiseDate: formattedDate,
        hashtags: AddAdviceData.hashtags || [],
        demandUpdates: AddAdviceData.demandUpdates || [],
        supportAttachment: AddAdviceData.supportAttachment || [],
      });
    }
  }, [editAddAdvice, AddAdviceData, setSectionName]);

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
    setLoading(true);
    const formData = new FormData();
  
    try {
      for (const key in feedback) {
        const value = feedback[key];
  
        if (key === "supportAttachment" && value?.length) {
          value.forEach((file) => {
            formData.append("supportAttachment", file);
          });
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString().split("T")[0]);
        } else if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
  
      const res = editAddAdvice
        ? await editDemandAPI(AddAdviceData._id, formData)
        : await addDemand(formData);
  
      if (res?.status === 201) {
        showSuccessToast("Demand Added");
        if (setIsEditing) setIsEditing(false);
      } else {
        showErrorToast(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      showErrorToast("Error submitting form");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl flex justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6">
          <p>
            {editAddAdvice ? "Edit Demand" : "Add Demand"}
          </p>
          {(editAddAdvice) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
        </h2>

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

        <Select
          label="Year"
          id="year"
          value={feedback.year}
          onChange={(e) => handleChange("year", e.target.value)}
          options={["1", "2", "3", "4"]}
          placeholder="Select year"
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
          id="supportAttachment"
          label="Support Attachment"
          multiple={true}
          onChange={(files) => handleChange("supportAttachment", files)}
          accept="image/*"
        />

        <InputField
          label="Rating (1-5)"
          id="rating"
          type="text"
          value={feedback.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          placeholder="Enter rating (1 to 5)"
        />

        <InputField
          label="Demand Title"
          id="demandTitle"
          value={feedback.demandTitle}
          onChange={(e) => handleChange("demandTitle", e.target.value)}
          placeholder="Enter demand title"
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
          label={
            <>
              Progress Count: <strong>{feedback.progressCount}</strong>
            </>
          }
          type="range"
          id="progressCount"
          min={0}
          max={100}
          step={5}
          value={feedback.progressCount}
          onChange={(e) => handleChange("progressCount", Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />

        <InputField
          label="Hashtags (comma separated)"
          id="hashtags"
          value={feedback.hashtags.join(", ")}
          onChange={(e) =>
            handleChange("hashtags", e.target.value.split(",").map((tag) => tag.trim()))
          }
          placeholder="Enter hashtags separated by commas"
        />

        <Select
          id="demandStatus"
          label="Demand Status"
          value={feedback.demandStatus}
          onChange={(e) => handleChange("demandStatus", e.target.value)}
          options={["approved", "denied", "pending"]}
          placeholder="Demand Status"
          required
        />

        <InputField
          id="demandRaiseDate"
          label="Demand Raise Date"
          type="date"
          placeholder="Enter Date"
          value={feedback.demandRaiseDate}
          onChange={(e) => handleChange("demandRaiseDate", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
        />

        <InputField
          label="Demand Submitted"
          id="demandSubmitted"
          value={feedback.demandSubmitted}
          onChange={(e) => handleChange("demandSubmitted", e.target.value)}
          placeholder="Enter demand submitted info"
        />

        <InputField
          label="Submitted To"
          id="submittedTo"
          value={feedback.submittedTo}
          onChange={(e) => handleChange("submittedTo", e.target.value)}
          placeholder="Enter submitted to"
        />

        <TextArea
          label="Administration Response"
          id="administrationResponse"
          value={feedback.administrationResponse}
          onChange={(e) => handleChange("administrationResponse", e.target.value)}
          placeholder="Enter administration response"
          rows={3}
        />

        <InputField
          label="Demand Updates (comma separated)"
          id="demandUpdates"
          value={feedback.demandUpdates.join(", ")}
          onChange={(e) =>
            handleChange("demandUpdates", e.target.value.split(",").map((update) => update.trim()))
          }
          placeholder="Enter demand updates separated by commas"
        />

        <div className="text-center mt-6">
          <Button loading={loading} type="submit" label={editAddAdvice ? "Update" : "Submit"} />
        </div>
      </form>
    </div>
  );
};

export default AddAdvice;