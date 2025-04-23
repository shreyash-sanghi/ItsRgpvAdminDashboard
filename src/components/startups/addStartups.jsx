import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import FileUpload from "../ui/fileUpload"; // Import the FileUpload component
import { addStartup } from "../../api/api";

const AddStartups = () => {
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
    startupLogo: "", // This will now store the file for logo
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
    console.log("Startup Data:", startup);

    const response = await addStartup(startup);
    if (response.status === 200) {
      console.log("Startup Data:", response);
    }
    else {
      console.log("Error:", response);
    }

    // Reset form after submission
    // setStartup({
    //   startupName: "",
    //   slogan: "",
    //   description: "",
    //   startupCategory: "",
    //   dateOfEshtablishment: null,
    //   founder: [""],
    //   contactEmail: "",
    //   contactPhone: "",
    //   socialLinks: [""],
    //   offlineLocation: "",
    //   startupLogo: "", // Reset the logo field
    // });
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
              <InputField
                id="dateOfEstablishment"
                type="date"
                // value={startup.dateOfEstablishment || ""}
                // onChange={(e) => handleChange("dateOfEstablishment", e.target.value)}
                // required
                value={startup.dateOfEshtablishment ? new Date(startup.dateOfEshtablishment).toISOString().split('T')[0] : ""}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  handleChange("dateOfEshtablishment", date.toISOString());
                }}
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
