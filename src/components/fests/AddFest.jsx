import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addFest } from "../../api/allApi/fests";
import FileUpload from "../ui/fileUpload";

const AddFest = () => {
  const [fest, setFest] = useState({
    festName: "",
    organisedBy: "",
    sponsor: "",
    description: "",
    dateOfEvent: "",
    bannerPicture: "",
    festImages: [],
    theme: "",
    chiefGuest: "",
    festVideo: null,
    listOfActivities: [],
  });

  const handleChange = (field, value) => {
    setFest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleBannerUpload = (field, file) => {
  setFest((prev) => ({
    ...prev,
    [field]: file, // Storing the entire file object
  }));
};

  const handlefestImagesUpload = (files) => {
    setFest((prev) => ({
      ...prev,
      festImages: [...prev.festImages, ...Array.from(files)], // Append new files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Manually append fields
      formData.append("festName", fest.festName);
      formData.append("organisedBy", fest.organisedBy);
      formData.append("sponsor", fest.sponsor);
      formData.append("description", fest.description);
      formData.append("dateOfEvent", fest.dateOfEvent);
      formData.append("theme", fest.theme);
      formData.append("chiefGuest", fest.chiefGuest);
      formData.append("festVideo", fest.festVideo || "");

      // Manually append banner picture if exists
      if (fest.bannerPicture) {
        formData.append("bannerPicture", fest.bannerPicture);
      }



      // Manually aad multiple images
      if (fest.festImages.length > 0) {
        fest.festImages.forEach((image, index) => {
          formData.append("festImages", image);
        });
      }

      // Manually append list of activities as a JSON string
      if (fest.listOfActivities.length > 0) {
        formData.append("listOfActivities", JSON.stringify(fest.listOfActivities));
      }

      const response = await addFest(formData);
      if (response.status === 200) {
        console.log("Fest added successfully:", response);
        // Reset form
        setFest({
          festName: "",
          organisedBy: "",
          sponsor: "",
          description: "",
          dateOfEvent: "",
          bannerPicture: null,
          festImages: [],
          theme: "",
          chiefGuest: "",
          festVideo: null,
          listOfActivities: [],
        });
      } else {
        console.error("Error adding fest:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Fest
        </h2>

        {/* Fest Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Fest Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="festName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Fest Name <span className="text-red-500">*</span>
              </label>
              <InputField
                id="festName"
                value={fest.festName}
                onChange={(e) => handleChange("festName", e.target.value)}
                placeholder="Enter fest name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="organisedBy"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Organised By <span className="text-red-500">*</span>
              </label>
              <InputField
                id="organisedBy"
                value={fest.organisedBy}
                onChange={(e) => handleChange("organisedBy", e.target.value)}
                placeholder="Enter organiser name"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="sponsor"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Sponsor
              </label>
              <InputField
                id="sponsor"
                value={fest.sponsor}
                onChange={(e) => handleChange("sponsor", e.target.value)}
                placeholder="Enter sponsor name"
              />
            </div>
            <div>
              <label
                htmlFor="theme"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Theme <span className="text-red-500">*</span>
              </label>
              <InputField
                id="theme"
                value={fest.theme}
                onChange={(e) => handleChange("theme", e.target.value)}
                placeholder="Enter fest theme"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <TextArea
              id="description"
              value={fest.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter fest description"
              rows={3}
              required
            />
          </div>
        </section>

        {/* Event Details Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Event Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="dateOfEvent"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date of Event <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfEvent"
                value={fest.dateOfEvent}
                onChange={(e) => handleChange("dateOfEvent", e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="chiefGuest"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Chief Guest
              </label>
              <InputField
                id="chiefGuest"
                value={fest.chiefGuest}
                onChange={(e) => handleChange("chiefGuest", e.target.value)}
                placeholder="Enter chief guest name"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="listOfActivities"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              List of Activities
            </label>
            <InputField
              id="listOfActivities"
              value={fest.listOfActivities.join(", ")}
              onChange={(e) =>
                handleChange(
                  "listOfActivities",
                  e.target.value.split(",").map((activity) => activity.trim()).filter(Boolean)
                )
              }
              placeholder="Enter activities (comma-separated)"
            />
          </div>
        </section>

        {/* Media Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Media
          </h3>
          <div>
            <label
              htmlFor="bannerPicture"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Banner Picture
            </label>
            <FileUpload
              id="bannerPicture"
              files={fest.bannerPicture} // Pass single file object
              onChange={(file) => handleBannerUpload("bannerPicture", file)}
              accept="image/*"

            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="festImages"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Fest Images
            </label>
            <FileUpload
              id="eventImages"
              multiple={true}
              onChange={(files) => handlefestImagesUpload(files)}
              accept="image/*"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="festVideo"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Fest Video
            </label>
            <input
              type="file"
              id="festVideo"
              accept="video/*"
              onChange={(e) => handleFileChange("festVideo", e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <Button label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddFest; 