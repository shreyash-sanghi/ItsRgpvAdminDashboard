import React, { useState, useContext, useEffect } from 'react'
import Button from '../ui/button'
import InputField from '../ui/input'
import TextArea from '../ui/textarea'
import FileUpload from '../ui/fileUpload'
import { addEvent, editEventAPI } from '../../api/allApi/event'
import Select from "../ui/select";
import { showSuccessToast, showErrorToast } from "../ui/toast";
import { UserContext } from '../../App'

function AddEvent({editEvent = false, EventData = {}, setIsEditing}) {

    const { setSectionName } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
  
    const [event, setEvent] = useState({
        eventName: "",
        description: "",
        organisedBy: "",
        venue: "",
        dateOfEvent: "",
        bannerPicture: null,
        eventImages: [],
        eventType: "",
        targetAudience: [],
        tags: "",
    });

    useEffect(() => {
        setSectionName(editEvent ? "Edit Event" : "Add Event");
      
        if (editEvent && EventData) {
          const formattedDate = EventData.dateOfEvent
            ? new Date(EventData.dateOfEvent).toISOString().split("T")[0]
            : "";
      
          setEvent({
            ...EventData,
            dateOfEvent: formattedDate,
            targetAudience: EventData.targetAudience?.length
              ? EventData.targetAudience
              : [""],
          });
        }
      }, [editEvent, EventData, setSectionName]);

    const handleChange = (field, value) => {
        setEvent((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBannerUpload = (field, file) => {
        setEvent((prev) => ({
            ...prev,
            [field]: file, // Store as a single file
        }));
    };

    const handleEventImagesUpload = (files) => {
        setEvent((prev) => ({
            ...prev,
            eventImages: [...prev.eventImages, ...Array.from(files)], // Append new files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const formData = new FormData();
      
          const isEqual = (val1, val2) => {
            if (Array.isArray(val1) && Array.isArray(val2)) {
              return JSON.stringify(val1) === JSON.stringify(val2);
            }
            return val1 === val2;
          };
      
          if (editEvent) {
            for (const [key, value] of Object.entries(event)) {
              const originalValue = EventData[key];
      
              if (key === "bannerPicture" && value && value !== originalValue) {
                formData.append("bannerPicture", value);
              } else if (key === "eventImages" && value.length) {
                if (!isEqual(value, originalValue)) {
                  value.forEach((img) => formData.append("eventImages", img));
                }
              } else if (key === "targetAudience") {
                if (!isEqual(value, originalValue)) {
                  formData.append("targetAudience", JSON.stringify(value));
                }
              } else {
                if (!isEqual(value, originalValue)) {
                  formData.append(key, value);
                }
              }
            }
      
            formData.append("formType", "event");
      
            await editEventAPI(EventData._id, formData);
            showSuccessToast("Event edited successfully");
            setIsEditing(false);
          } else {
            for (const [key, value] of Object.entries(event)) {
              if (key === "eventImages" && value.length) {
                value.forEach((img) => formData.append("eventImages", img));
              } else if (key === "targetAudience") {
                formData.append("targetAudience", JSON.stringify(value));
              } else if (key === "bannerPicture" && value) {
                formData.append("bannerPicture", value);
              } else if (value !== null && value !== "") {
                formData.append(key, value);
              }
            }
      
            formData.append("formType", "event");
      
            const response = await addEvent(formData); // fixed typo: addFest → addEvent
            if (response.status === 201) {
              showSuccessToast("Event Info added successfully...");
              setEvent({
                eventName: "",
                description: "",
                organisedBy: "",
                venue: "",
                dateOfEvent: "",
                bannerPicture: null,
                eventImages: [],
                eventType: "",
                targetAudience: [],
                tags: "",
              });
            } else {
              showErrorToast("Error while adding Event..");
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
          <p>{editEvent ? "Edit Event" : "Add Event"}</p>
          {editEvent && (
            <Button onClick={() => setIsEditing(false)} label="<- Back" />
          )}
        </h2>
                {/* Event Details Section */}
                <section>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputField
                                label="Event Name"
                                id="eventName"
                                value={event.eventName}
                                onChange={(e) => handleChange("eventName", e.target.value)}
                                placeholder="Enter event name"
                                required
                            />
                        </div>
                        <div>
                            <InputField
                                label="Organised By"
                                id="organisedBy"
                                value={event.organisedBy}
                                onChange={(e) => handleChange("organisedBy", e.target.value)}
                                placeholder="Enter organizer's name"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <InputField
                                id="venue"
                                label="Venue"
                                value={event.venue}
                                onChange={(e) => handleChange("venue", e.target.value)}
                                placeholder="Enter venue"
                                required
                            />
                        </div>
                        <div>
                            <InputField
                                id="dateOfEvent"
                                label="Event Date"
                                type="date"
                                placeholder="Enter Date"
                                value={event.dateOfEvent}
                                onChange={(e) => handleChange("dateOfEvent", e.target.value)}
                                max={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <TextArea
                            label="Description"
                            id="description"
                            value={event.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Enter event description"
                            rows={4}
                            required
                        />
                    </div>
                </section>

                {/* Media Section */}
                <section className="mt-6">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <FileUpload
                                label="Banner Picture"
                                id="bannerPicture"
                                files={event.bannerPicture}
                                onChange={(files) => handleBannerUpload("bannerPicture", files)}
                                accept="image/*"
                                required={editEvent ? false : true}
                            />
                        </div>
                        <div>
                            <FileUpload
                                label="Event Images"
                                id="eventImages"
                                multiple={true}
                                onChange={(files) => handleEventImagesUpload(files)}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </section>

                {/* Additional Details Section */}
                <section className="mt-6">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Select
                            id="eventType"
                            label="Event Type"
                            value={event.eventType}
                            onChange={(e) => handleChange("eventType", e.target.value)}
                            options={[
                                "Tech",
                                "Non-tech"
                            ]}
                            placeholder="Enter event type (e.g., Tech, Non-tech)"
                            required
                        />
                        <div>

                            <InputField
                                label="Tags"
                                id="tags"
                                value={event.tags}
                                onChange={(e) => handleChange("tags", e.target.value)}
                                placeholder="Enter tags (comma-separated)"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <InputField
                            id="targetAudience"
                            label="Target Audience"
                            value={event.targetAudience.join(", ")}
                            onChange={(e) => handleChange("targetAudience", e.target.value.split(",").map((audience) => audience.trim()))}
                            placeholder="Enter target audience categories (comma-separated)"
                        />
                    </div>
                </section>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <Button loading={loading} type="submit"label={editEvent ? "Update" :"Add Event"} />
                </div>
            </form>
        </div>
    )
}

export default AddEvent;