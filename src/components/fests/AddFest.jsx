import React, { useState, useContext, useEffect } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import TextArea from "../ui/textarea";
import { addFest, editFestAPI } from "../../api/allApi/fests";
import FileUpload from "../ui/fileUpload";
import { showErrorToast, showSuccessToast } from "../ui/toast";
import { UserContext } from "../../App";

const AddFest = ({ editFest = false, FestData = {}, setIsEditing }) => {
  const { setSectionName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [fest, setFest] = useState({
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

  useEffect(() => {
    setSectionName(editFest ? "Edit Fest" : "Add Fest");

    if (editFest && FestData) {

      const isoDate = FestData.dateOfEvent;
      const formattedDate = isoDate ? isoDate.split("T")[0] : "";

      setFest({
        ...FestData,
        dateOfEvent : formattedDate,
        listOfActivities: FestData.listOfActivities?.length
          ? FestData.listOfActivities
          : [""],
      });
    }
  }, [editFest, FestData, setSectionName]);

  const handleChange = (field, value) => {
    setFest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBannerUpload = (field, file) => {
    setFest((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handlefestImagesUpload = (files) => {
    setFest((prev) => ({
      ...prev,
      festImages: [...prev.festImages, ...Array.from(files)],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      const isEqual = (key, val1, val2) => {
        if (Array.isArray(val1) && Array.isArray(val2)) {
          return JSON.stringify(val1) === JSON.stringify(val2);
        }
        return val1 === val2;
      };

      if (editFest) {
        for (const [key, value] of Object.entries(fest)) {
          const originalValue = FestData[key];

          if (key === "bannerPicture" && value && value !== originalValue) {
            formData.append("bannerPicture", value);
          } else if (key === "festImages" && value.length) {
            if (!isEqual(key, value, originalValue)) {
              value.forEach((img) => formData.append("festImages", img));
            }
          } else if (key === "listOfActivities") {
            if (!isEqual(key, value, originalValue)) {
              formData.append("listOfActivities", JSON.stringify(value));
            }
          } else {
            if (!isEqual(key, value, originalValue)) {
              formData.append(key, value);
            }
          }
          formData.append("formType","fest");
        }

        await editFestAPI(FestData._id, formData);
        showSuccessToast("Fest edited successfully");
        setIsEditing(false);
      } else {
        // Add new fest
        for (const [key, value] of Object.entries(fest)) {
          if (key === "festImages" && value.length) {
            value.forEach((img) => formData.append("festImages", img));
          } else if (key === "listOfActivities") {
            formData.append("listOfActivities", JSON.stringify(value));
          } else if (key === "bannerPicture" && value) {
            formData.append("bannerPicture", value);
          } else if (value !== null && value !== "") {
            formData.append(key, value);
          }
          formData.append("formType","fest")
        }

        const response = await addFest(formData);
        if (response.status === 201) {
          showSuccessToast("Fest Info added successfully...");
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
          showErrorToast("Error while adding Fest..");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      showErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl flex justify-between font-semibold text-gray-800 dark:text-gray-100 mb-6">
          <p>{editFest ? "Add Fest" : "Add Fest"}</p>
          {editFest && (
            <Button onClick={() => setIsEditing(false)} label="<- Back" />
          )}
        </h2>

        {/* Fest Details Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Fest Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Fest Name"
              id="festName"
              value={fest.festName}
              onChange={(e) => handleChange("festName", e.target.value)}
              placeholder="Enter fest name"
              required
            />
            <InputField
              label="Organised By"
              id="organisedBy"
              value={fest.organisedBy}
              onChange={(e) => handleChange("organisedBy", e.target.value)}
              placeholder="Enter organiser name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <InputField
              label="Sponsor"
              id="sponsor"
              value={fest.sponsor}
              onChange={(e) => handleChange("sponsor", e.target.value)}
              placeholder="Enter sponsor name"
            />
            <InputField
              label="Theme"
              id="theme"
              value={fest.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              placeholder="Enter fest theme"
              required
            />
          </div>

          <div className="mt-4">
            <TextArea
              label="Description"
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
            <InputField
              id="dateOfEvent"
              label="Date of Event"
              type="date"
              placeholder="Enter Date"
              value={fest.dateOfEvent}
              onChange={(e) => handleChange("dateOfEvent", e.target.value)}
              required
            />
            <InputField
              label="Chief Guest"
              id="chiefGuest"
              value={fest.chiefGuest}
              onChange={(e) => handleChange("chiefGuest", e.target.value)}
              placeholder="Enter chief guest name"
            />
          </div>
          <div className="mt-4">
            <InputField
              label="List Of Activities"
              id="listOfActivities"
              value={fest.listOfActivities.join(", ")}
              onChange={(e) =>
                handleChange(
                  "listOfActivities",
                  e.target.value
                    .split(",")
                    .map((activity) => activity.trim())
                    .filter(Boolean)
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
          <FileUpload
            label="Banner Picture"
            id="bannerPicture"
            files={fest.bannerPicture}
            onChange={(file) => handleBannerUpload("bannerPicture", file)}
            accept="image/*"
          />
          <div className="mt-4">
            <FileUpload
              id="eventImages"
              label="Fest Images"
              multiple={true}
              onChange={(files) => handlefestImagesUpload(files)}
              accept="image/*"
            />
          </div>
          <div className="mt-4">
            <InputField
              label="Fest Video"
              id="festVideo"
              value={fest.festVideo}
              onChange={(e) => handleChange("festVideo", e.target.value)}
              placeholder="Enter fest-video link"
            />
          </div>
        </section>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            label={editFest ? "Update" :"Add Fest"}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddFest;