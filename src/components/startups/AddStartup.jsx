import React, { useState, useEffect, useContext } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import FileUpload from "../../components/ui/fileUpload";
import { addStartup, editStartupAPI } from "../../api/allApi/startup";
import { UserContext } from "../../App";
import { showSuccessToast, showErrorToast } from "../ui/toast";

const AddStartup = ({ editStartup = false, StartupData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [startup, setStartup] = useState({
    startupName: "",
    slogan: "",
    description: "",
    startupCategory: "",
    dateOfEstablishment: null,
    founder: [""],
    contactEmail: "",
    contactPhone: "",
    socialLinks: [""],
    offlineLocation: "",
    startupLogo: null,
  });

  useEffect(() => {
    setSectionName(editStartup ? "Edit Startup" : "Add Startup");

    

    if (editStartup && StartupData) {
      const isoDate = StartupData.achievementDate;
      const formattedDate = isoDate ? isoDate.split("T")[0] : "";
  

      setStartup({
        ...StartupData,
        dateOfEstablishment: formattedDate,
        founder: StartupData.founder?.length ? StartupData.founder : [""],
        socialLinks: StartupData.socialLinks?.length ? StartupData.socialLinks : [""],
        startupLogo: null, // Only upload new file if changed
      });
    }
  }, [editStartup, StartupData, setSectionName]);

  const handleChange = (field, value) => {
    setStartup((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, files) => {
    setStartup((prev) => ({
      ...prev,
      [field]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      for (const key in startup) {
        if (key === "startupLogo") {
          if (startup.startupLogo) {
            formData.append("startupLogo", startup.startupLogo);
          }
        } else if (key === "founder" || key === "socialLinks") {
          formData.append(key, JSON.stringify(startup[key]));
        } else {
          formData.append(key, startup[key]);
        }
      }

      formData.append("formType", "startup");

      let response;
      if (editStartup) {
        response = await editStartupAPI(StartupData._id, formData);
        if (response.status === 200) {
          showSuccessToast("Startup updated successfully");
          setIsEditing(false);
        }
      } else {
        response = await addStartup(formData);
        if (response.status === 201) {
          showSuccessToast("Startup added successfully");
          setStartup({
            startupName: "",
            slogan: "",
            description: "",
            startupCategory: "",
            dateOfEstablishment: null,
            founder: [""],
            contactEmail: "",
            contactPhone: "",
            socialLinks: [""],
            offlineLocation: "",
            startupLogo: null,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting startup:", error);
      showErrorToast("Error while submitting startup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          {editStartup ? "Edit Startup" : "Add Startup"}
        </h2>

        {/* Startup Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Startup Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Startup Name"
              id="startupName"
              value={startup.startupName}
              onChange={(e) => handleChange("startupName", e.target.value)}
              placeholder="Enter startup name"
              required
            />
            <InputField
              label="Slogan"
              id="slogan"
              value={startup.slogan}
              onChange={(e) => handleChange("slogan", e.target.value)}
              placeholder="Enter slogan"
            />
          </div>

          <div className="mt-4">
            <TextArea
              label="Description"
              id="description"
              value={startup.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <InputField
              label="Startup Category"
              id="startupCategory"
              value={startup.startupCategory}
              onChange={(e) => handleChange("startupCategory", e.target.value)}
              placeholder="Enter category"
              required
            />
            <InputField
              id="dateOfEstablishment"
              label="Date of Establishment"
              type="date"
              placeholder="Date of Establishment"
              value={startup.dateOfEstablishment}
              onChange={(e) => handleChange("dateOfEstablishment", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Founder(s)"
              id="founder"
              value={startup.founder.join(", ")}
              onChange={(e) =>
                handleChange(
                  "founder",
                  e.target.value.split(",").map((name) => name.trim())
                )
              }
              placeholder="Enter founder names (comma-separated)"
            />
          </div>
        </section>

        {/* Contact Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Contact Email"
              id="contactEmail"
              type="email"
              value={startup.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              placeholder="Enter email"
              required
            />
            <InputField
              label="Contact Phone"
              id="contactPhone"
              type="number"
              value={startup.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Social Links"
              id="socialLinks"
              value={startup.socialLinks.join(", ")}
              onChange={(e) =>
                handleChange(
                  "socialLinks",
                  e.target.value.split(",").map((link) => link.trim())
                )
              }
              placeholder="Enter social links (comma-separated)"
              required
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Offline Location"
              id="offlineLocation"
              value={startup.offlineLocation}
              onChange={(e) => handleChange("offlineLocation", e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>
        </section>

        {/* Logo Upload */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Startup Logo
          </h3>
          <FileUpload
            label="Logo Upload (Image)"
            id="startupLogo"
            files={startup.startupLogo ? [startup.startupLogo] : []}
            onChange={(files) => handleChange("startupLogo", files)}
            required={!editStartup}
          />
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button
            type="submit"
            label={editStartup ? "Update" : "Submit"}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddStartup;