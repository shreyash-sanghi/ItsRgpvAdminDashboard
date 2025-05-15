import React, { useState,useEffect } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import FileUpload from "../../components/ui/fileUpload"; // Import the FileUpload component
import { addStartup } from "../../api/allApi/startup.js";
import { UserContext } from "../../App";
import { useContext } from "react";

const AddStartups = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);
  useEffect(()=>{
    setSectionName("Add Startups");
  },[])

  const [startup, setStartup] = useState({
    startupName: "",
    slogan: "",
    description: "",
    startupCategory: "",
    dateOfEshtablishment: null,
    founder: [""],
    contactEmail: "",
    contactPhone: "",
    socialLinks: [""],
    offlineLocation: "",
    startupLogo: null, // This will now store the file for logo
  });

  const handleChange = (field, value) => {
    setStartup((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, files) => {
    setStartup((prev) => ({
      ...prev,
      [field]: files, // Store the uploaded files in the corresponding field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();

        // Manually append each field to FormData
        formData.append("startupName", startup.startupName);
        formData.append("slogan", startup.slogan);
        formData.append("description", startup.description);
        formData.append("startupCategory", startup.startupCategory);
        formData.append("dateOfEshtablishment", startup.dateOfEshtablishment);
        formData.append("founder", JSON.stringify(startup.founder));  // Append array as a string
        formData.append("contactEmail", startup.contactEmail);
        formData.append("contactPhone", startup.contactPhone);
        formData.append("socialLinks", JSON.stringify(startup.socialLinks));  // Append array as a string
        formData.append("offlineLocation", startup.offlineLocation);
        formData.append("formType", "startup")
        // Manually handle file upload
        if (startup.startupLogo) {
            formData.append("startupLogo", startup.startupLogo);
        }

        // Make the API call with FormData
        const response = await addStartup(formData);
        if (response.status === 201) {
            alert("Startup added successfully!");
            console.log("Startup Data:", response.data);
        } else {
            alert("Error adding startup.");
            console.error("Error:", response);
        }
    } catch (error) {
        alert("Submission failed!");
        console.error("Error during submission:", error);
    }
};

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Startup</h2>

        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Startup Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startupName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Startup Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="startupName"
                value={startup.startupName}
                onChange={(e) => handleChange("startupName", e.target.value)}
                placeholder="Enter startup name"
                required
              />
            </div>
            <div>
              <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slogan
              </label>
              <InputField
                id="slogan"
                value={startup.slogan}
                onChange={(e) => handleChange("slogan", e.target.value)}
                placeholder="Enter slogan"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <TextArea
              id="description"
              value={startup.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="startupCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Startup Category <span className="text-red-500">*</span>
              </label>
              <InputField
                id="startupCategory"
                value={startup.startupCategory}
                onChange={(e) => handleChange("startupCategory", e.target.value)}
                placeholder="Enter category"
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfEstablishment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Establishment <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfEstablishment"
                value={startup.dateOfEshtablishment ? new Date(startup.dateOfEshtablishment).toISOString().split('T')[0] : ""}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  handleChange("dateOfEshtablishment", date.toISOString());
                }}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="founder" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Founder(s)
            </label>
            <InputField
              id="founder"
              value={startup.founder.join(", ")}
              onChange={(e) => handleChange("founder", e.target.value.split(",").map((name) => name.trim()))}
              placeholder="Enter founder names (comma-separated)"
            />
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <InputField
                id="contactEmail"
                type="email"
                value={startup.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Phone
              </label>
              <InputField
                id="contactPhone"
                value={startup.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Social Links
            </label>
            <InputField
              id="socialLinks"
              value={startup.socialLinks.join(", ")}
              onChange={(e) => handleChange("socialLinks", e.target.value.split(",").map((link) => link.trim()))}
              placeholder="Enter social links (comma-separated)"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="offlineLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Offline Location
            </label>
            <InputField
              id="offlineLocation"
              value={startup.offlineLocation}
              onChange={(e) => handleChange("offlineLocation", e.target.value)}
              placeholder="Enter location"
            />
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Startup Logo</h3>
          <div>
            <label htmlFor="startupLogo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Logo Upload (Image)
            </label>
            <FileUpload
              id="startupLogo"
              files={startup.startupLogo}
              onChange={(files) => handleFileUpload("startupLogo", files)}
            />
          </div>
        </section>

        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddStartups;
