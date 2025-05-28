import React, { useState } from "react";
import Button from "../ui/button";
import InputField from "../ui/input";
import FileUpload from "../ui/fileUpload";
import SelectField from "../ui/select";

const AddReelsAndVideos = () => {
  const [reelAndVideoData, setReelAndVideoData] = useState({
    title: "",
    type: "video", // Default to video
    category: "",
    description: "",
    thumbnail: null,
    videoUrl: null,
    uploadDate: new Date().toISOString(),
  });

  const handleChange = (field, value) => {
    setReelAndVideoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field, files) => {
    setReelAndVideoData((prev) => ({
      ...prev,
      [field]: files[0], // Take the first file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(reelAndVideoData).forEach((key) => {
        if (key === "thumbnail" || key === "videoUrl") {
          if (reelAndVideoData[key]) {
            formData.append(key, reelAndVideoData[key]);
          }
        } else {
          formData.append(key, reelAndVideoData[key]);
        }
      });

      const response = await addReelsAndVideos(formData);
      if (response.status === 200) {
        console.log("Reel/Video added successfully:", response);
        // Reset form
        setReelAndVideoData({
          title: "",
          type: "video",
          category: "",
          description: "",
          thumbnail: null,
          videoUrl: null,
          uploadDate: new Date().toISOString(),
        });
      } else {
        console.error("Error adding reel/video:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Add Reel or Video
        </h2>

        {/* Basic Information Section */}
        <section>
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField
                id="title"
                label="Title"
                value={reelAndVideoData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div>
            <InputField
              label="Category"
              id="category"
              value={reelAndVideoData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Enter category"
              required
            />
            </div>
          </div>
          <div className="mt-4">
            
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={reelAndVideoData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="3"
            />
          </div>
        </section>

        {/* Media Upload Section */}
        <section className="mt-6">
          <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
            Media Upload
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FileUpload
                label="thumbnail"
                id="thumbnail"
                onChange={(e) => handleFileChange("thumbnail", e.target.files)}
                accept="image/*"
              />
            </div>
            <div>
              <InputField
                label="Video Link"
                id="videoUrl"
                value={reelAndVideoData.videoUrl}
                onChange={(e) => handleChange("videoUrl", e.target.value)}
                placeholder="Enter link"
              />
            </div>
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

export default AddReelsAndVideos; 