import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addScholarship } from "../../api/allApi/scholarship";

const AddScholarship = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log("ScholarShip Data : ", scholarship);
      const response = await addScholarship(scholarship);
      alert("success");
    }catch(error){
      console.log(error);
      alert(error);
    }
  };

  
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Scholarship
        </h2>

        <div>
          <label
            htmlFor="organisationName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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
          <label
            htmlFor="organisationType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Organization Type <span className="text-red-500">*</span>
          </label>
          <select
            id="organisationType"
            value={scholarship.organisationType}
            onChange={(e) => handleChange("organisationType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select organization type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="applyUrl"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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
          <label
            htmlFor="eligibilityCriteria"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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
          <label
            htmlFor="documentRequired"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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
          <label
            htmlFor="contactInfo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
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

export default AddScholarship; 