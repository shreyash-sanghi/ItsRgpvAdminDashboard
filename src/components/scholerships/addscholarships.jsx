import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addScholarship } from "../../api/api";

const Addscholarships = () => {
  const [scholarship, setScholarship] = useState({
    organisationName: "",
    organisationType: "",
    applyUrl: "",
    amount: 0,
    eligibilityCriteria: [],
    documentRequired: [],
    contactInfo: [],
  });

  const handleChange = (field, value) => {
    setScholarship((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, value) => {
    setScholarship((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Scholarship Data:", scholarship);

    const response = await addScholarship(scholarship);
    if (response.status === 200) {
      console.log("Scholarship Data:", response);
    } else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setScholarship({
    //   organisationName: "",
    //   organisationType: "",
    //   applyUrl: "",
    //   amount: 0,
    //   eligibilityCriteria: [],
    //   documentRequired: [],
    //   contactInfo: [],
    // });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Scholarship</h2>

        <div>
          <label htmlFor="organisationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <InputField
            id="organisationName"
            value={scholarship.organisationName}
            onChange={(e) => handleChange("organisationName", e.target.value)}
            placeholder="Enter organization name"
            required
          />
        </div>

        <div>
          <label htmlFor="organisationType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Organization Type <span className="text-red-500">*</span>
          </label>
          <InputField
            id="organisationType"
            value={scholarship.organisationType}
            onChange={(e) => handleChange("organisationType", e.target.value)}
            placeholder="Enter organization type (e.g., Government, Private)"
            required
          />
        </div>

        <div>
          <label htmlFor="applyUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Application URL <span className="text-red-500">*</span>
          </label>
          <InputField
            id="applyUrl"
            value={scholarship.applyUrl}
            onChange={(e) => handleChange("applyUrl", e.target.value)}
            placeholder="Enter application URL"
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Scholarship Amount <span className="text-red-500">*</span>
          </label>
          <InputField
            id="amount"
            type="number"
            value={scholarship.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="Enter scholarship amount"
            required
          />
        </div>

        <div>
          <label htmlFor="eligibilityCriteria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Eligibility Criteria <span className="text-red-500">*</span>
          </label>
          <TextArea
            id="eligibilityCriteria"
            value={scholarship.eligibilityCriteria.join(", ")}
            onChange={(e) => handleArrayChange("eligibilityCriteria", e.target.value)}
            placeholder="Enter eligibility criteria (comma-separated)"
            rows={3}
            required
          />
        </div>

        <div>
          <label htmlFor="documentRequired" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Documents Required <span className="text-red-500">*</span>
          </label>
          <TextArea
            id="documentRequired"
            value={scholarship.documentRequired.join(", ")}
            onChange={(e) => handleArrayChange("documentRequired", e.target.value)}
            placeholder="Enter required documents (comma-separated)"
            rows={3}
            required
          />
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Contact Information <span className="text-red-500">*</span>
          </label>
          <TextArea
            id="contactInfo"
            value={scholarship.contactInfo.join(", ")}
            onChange={(e) => handleArrayChange("contactInfo", e.target.value)}
            placeholder="Enter contact information (comma-separated)"
            rows={3}
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



export default Addscholarships;