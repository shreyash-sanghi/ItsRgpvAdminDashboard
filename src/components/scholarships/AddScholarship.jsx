import React, { useState, useEffect, useContext } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import Select from "../ui/select";
import TextArea from "../ui/textarea";
import { addScholarship, editScholarshipAPI } from "../../api/allApi/scholarship"; // Make sure editScholarshipAPI exists
import { showSuccessToast, showErrorToast } from "../ui/toast";
import { UserContext } from "../../App"; // Adjust path as needed

const AddScholarship = ({ editScholarship = false, ScholarshipData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [scholarship, setScholarship] = useState({
    organisationName: "",
    organisationType: "",
    applyUrl: "",
    amount: 0,
    eligibilityCriteria: [""],
    documentRequired: [""],
    contactInfo: [""],
  });

  // Store original data to compare changes (for edit mode)
  const [originalScholarship, setOriginalScholarship] = useState(null);

  useEffect(() => {
    setSectionName(editScholarship ? "Edit Scholarship" : "Add Scholarship");

    if (editScholarship && ScholarshipData) {
      const data = {
        organisationName: ScholarshipData.organisationName || "",
        organisationType: ScholarshipData.organisationType || "",
        applyUrl: ScholarshipData.applyUrl || "",
        amount: ScholarshipData.amount || 0,
        eligibilityCriteria: ScholarshipData.eligibilityCriteria?.length
          ? ScholarshipData.eligibilityCriteria
          : [""],
        documentRequired: ScholarshipData.documentRequired?.length
          ? ScholarshipData.documentRequired
          : [""],
        contactInfo: ScholarshipData.contactInfo?.length
          ? ScholarshipData.contactInfo
          : [""],
      };

      setScholarship(data);
      setOriginalScholarship(data);
    }
  }, [editScholarship, ScholarshipData, setSectionName]);

  const handleChange = (field, value) => {
    setScholarship((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value) => {
    // Split by comma and trim spaces for array fields
    setScholarship((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let payload = scholarship;

      if (editScholarship && originalScholarship) {
        // Compare current scholarship with original and send only changed fields
        payload = {};
        for (const key in scholarship) {
          if (Array.isArray(scholarship[key])) {
            if (
              JSON.stringify(scholarship[key]) !== JSON.stringify(originalScholarship[key])
            ) {
              payload[key] = scholarship[key];
            }
          } else {
            if (scholarship[key] !== originalScholarship[key]) {
              payload[key] = scholarship[key];
            }
          }
        }

        if (Object.keys(payload).length === 0) {
          showErrorToast("No changes detected.");
          setLoading(false);
          return;
        }
      }

      console.log("Submitting scholarship:", payload);

      if (editScholarship) {
        // Call update API with the scholarship id and changed fields
        await editScholarshipAPI(ScholarshipData._id, payload);
        showSuccessToast("Scholarship updated successfully");
        if (setIsEditing) setIsEditing(false);
      } else {
        // Add new scholarship
        await addScholarship(payload);
        showSuccessToast("Scholarship added successfully");
        if (setIsEditing) setIsEditing(false);
      }
    } catch (error) {
      console.error("Error submitting scholarship:", error);
      showErrorToast(
        editScholarship ? "Failed to update scholarship" : "Failed to add scholarship"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        <p>
          {editScholarship ? "Edit Scholarship" : "Add Scholarship"}
          </p>
          {(editScholarship) && (<>
            <Button onClick={() => setIsEditing(false)} label="<- Back"></Button>
          </>)}
        </h2>

        <div>
          <InputField
            label="Organization Name"
            id="organisationName"
            value={scholarship.organisationName}
            onChange={(e) => handleChange("organisationName", e.target.value)}
            placeholder="Enter organization name"
            required
          />
        </div>

        <div>
          <Select
            id="organisationType"
            label="Organization Type"
            value={scholarship.organisationType}
            onChange={(e) => handleChange("organisationType", e.target.value)}
            options={["Government", "Private"]}
            placeholder="Select Organization Type"
            required
          />
        </div>

        <div>
          <InputField
            label="Application URL"
            id="applyUrl"
            value={scholarship.applyUrl}
            onChange={(e) => handleChange("applyUrl", e.target.value)}
            placeholder="Enter application URL"
            required
          />
        </div>

        <div>
          <InputField
            label="Scholarship Amount"
            id="amount"
            type="number"
            value={scholarship.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="Enter scholarship amount"
            required
          />
        </div>

        <div>
          <TextArea
            label="Eligibility Criteria"
            id="eligibilityCriteria"
            value={scholarship.eligibilityCriteria.join(", ")}
            onChange={(e) => handleArrayChange("eligibilityCriteria", e.target.value)}
            placeholder="Enter eligibility criteria (comma-separated)"
            rows={3}
            required
          />
        </div>

        <div>
          <TextArea
            label="Documents Required"
            id="documentRequired"
            value={scholarship.documentRequired.join(", ")}
            onChange={(e) => handleArrayChange("documentRequired", e.target.value)}
            placeholder="Enter required documents (comma-separated)"
            rows={3}
            required
          />
        </div>

        <div>
          <TextArea
            label="Contact Information"
            id="contactInfo"
            value={scholarship.contactInfo.join(", ")}
            onChange={(e) => handleArrayChange("contactInfo", e.target.value)}
            placeholder="Enter contact information (comma-separated)"
            rows={3}
            required
          />
        </div>

        <div className="text-center mt-6">
          <Button loading={loading} type="submit" label={editScholarship ? "Update" : "Submit"} />
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;