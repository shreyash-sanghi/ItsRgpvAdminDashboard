import React, { useState } from 'react'
import Button from '../ui/button'
import InputField from '../ui/input'
import TextArea from '../ui/textarea'
import FileUpload from '../ui/fileUpload'
import { addEvent } from '../../api/allApi/event'


function AddEvent() {
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
            const formData = new FormData();

            // Append text fields
            formData.append("eventName", event.eventName);
            formData.append("description", event.description);
            formData.append("organisedBy", event.organisedBy);
            formData.append("venue", event.venue);
            formData.append("dateOfEvent", event.dateOfEvent);
            formData.append("eventType", event.eventType);
            formData.append("tags", event.tags);
            formData.append("targetAudience", JSON.stringify(event.targetAudience));

            // Append the banner picture
            if (event.bannerPicture) {
                formData.append("bannerPicture", event.bannerPicture);
            }

            // Append multiple event images
            event.eventImages.forEach((file) => {
                formData.append("eventImages", file);
            });

            // Send the form data using addEvent function
            const response = await addEvent(formData);
            console.log("Event added:", response.data);
            alert("Event added successfully!");
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Failed to add event.");
        }
    };

    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Event Form</h2>

                {/* Event Details Section */}
                <section>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Event Name <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="eventName"
                                value={event.eventName}
                                onChange={(e) => handleChange("eventName", e.target.value)}
                                placeholder="Enter event name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="organisedBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Organised By <span className="text-red-500">*</span>
                            </label>
                            <InputField
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
                            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Venue <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="venue"
                                value={event.venue}
                                onChange={(e) => handleChange("venue", e.target.value)}
                                placeholder="Enter venue"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dateOfEvent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date of Event <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="dateOfEvent"
                                value={event.dateOfEvent}
                                onChange={(e) => handleChange("dateOfEvent", e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <TextArea
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
                            <label htmlFor="bannerPicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Banner Picture <span className="text-red-500">*</span>
                            </label>
                            <FileUpload
                                id="bannerPicture"
                                files={event.bannerPicture}
                                onChange={(files) => handleBannerUpload("bannerPicture", files)}
                                accept="image/*"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="eventImages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Event Images
                            </label>
                            <FileUpload
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
                        <div>
                            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Event Type <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="eventType"
                                value={event.eventType}
                                onChange={(e) => handleChange("eventType", e.target.value)}
                                placeholder="Enter event type (e.g., Tech, Non-tech)"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tags <span className="text-red-500">*</span>
                            </label>
                            <InputField
                                id="tags"
                                value={event.tags}
                                onChange={(e) => handleChange("tags", e.target.value)}
                                placeholder="Enter tags (comma-separated)"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Target Audience
                        </label>
                        <InputField
                            id="targetAudience"
                            value={event.targetAudience.join(", ")}
                            onChange={(e) => handleChange("targetAudience", e.target.value.split(",").map((audience) => audience.trim()))}
                            placeholder="Enter target audience categories (comma-separated)"
                        />
                    </div>
                </section>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <Button label="Submit" />
                </div>
            </form>
        </div>
    )
}

export default AddEvent