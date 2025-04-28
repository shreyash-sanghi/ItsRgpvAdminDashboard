import React, { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import InputField from "../../components/ui/input";
import TextArea from "../../components/ui/textarea";
import { addFest } from "../../api/api";
import { UserContext } from "../../App";
import { useContext } from "react";

const AddFestForm = () => {

  // title name of header
  const {setSectionName} = useContext(UserContext);

  useEffect(()=>{
    setSectionName("Add Fest");
  },[])


  const [fest, setFest] = useState({
    festName: "",
    organisedBy: "",
    sponsor: "",
    description: "",
    dateOfEvent: "",
    bannerPicture: null,
    festImages: [""],
    theme: "",
    chiefGuest: "",
    festVideo: null,
    listOfActivities: [""],
  });

  const handleChange = (field, value) => {
    setFest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Fest Data:", fest);

    const response = await addFest(fest);
    if (response.status === 200) {
      console.log("Fest Data:", response);
    } else {
      console.log("Error:", response);
    }


    // Reset form after submission
    // setFest({
    //   festName: "",
    //   organisedBy: "",
    //   sponsor: "",
    //   description: "",
    //   dateOfEvent: "",
    //   bannerPicture: null,
    //   festImages: [""],
    //   theme: "",
    //   chiefGuest: "",
    //   festVideo: null,
    //   listOfActivities: [""],
    // });
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
              placeholder="Enter fest description (20-50 characters)"
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
              <InputField
                id="dateOfEvent"
                type="date"
                value={fest.dateOfEvent}
                onChange={(e) => handleChange("dateOfEvent", e.target.value)}
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
                  e.target.value.split(",").map((activity) => activity.trim())
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
            <InputField
              id="bannerPicture"
              type="file"
              onChange={(e) => handleChange("bannerPicture", e.target.files[0])}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="festImages"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Fest Images
            </label>
            <InputField
              id="festImages"
              value={fest.festImages.join(", ")}
              onChange={(e) =>
                handleChange(
                  "festImages",
                  e.target.value.split(",").map((img) => img.trim())
                )
              }
              placeholder="Enter image URLs (comma-separated)"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="festVideo"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Fest Video
            </label>
            <InputField
              id="festVideo"
              type="file"
              onChange={(e) => handleChange("festVideo", e.target.files[0])}
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

export default AddFestForm;
